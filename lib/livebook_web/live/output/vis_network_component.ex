defmodule LivebookWeb.Output.VisNetworkComponent do
  use LivebookWeb, :live_component

  @impl true
  def update(assigns, socket) do
    socket = assign(socket, id: assigns.id)
    {:ok, push_event(socket, "vis_network:#{socket.assigns.id}:init", %{"spec" => assigns.spec})}
  end

  @impl true
  def render(assigns) do
    ~H"""
    <div id={"vis-network#{@id}"} phx-hook="VisNetwork" phx-update="ignore" data-id={@id}>
    </div>
    """
  end
end
