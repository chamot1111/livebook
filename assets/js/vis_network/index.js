import * as vis from "vis-network";
import { getAttributeOrThrow } from "../lib/attribute";

/**
 * A hook used to render graphics according to the given
 * Vis netork specification.
 *
 * The hook expects a `vis_network:<id>:init` event with `{ spec }` payload,
 * where `spec` is the graphic definition as an object.
 *
 * Configuration:
 *
 *   * `data-id` - plot id
 *
 */
const VisNetwork = {
  mounted() {
    this.props = getProps(this);
    this.state = {
      network: null,
      spec: null,
    };

    var btn = document.createElement("button");
    btn.style.cssFloat = 'right';
    this.el.appendChild(btn);

    var container = document.createElement("div");
    this.el.appendChild(container);

    btn.innerText = "start";
    btn.onclick = () => {
      if(this.state.network) {
        btn.innerText = "start";
        this.state.network.destroy();
        this.state.network = null;
      } else {
        btn.innerText = "stop";
        this.state.network = new vis.Network(container, this.spec.data, this.spec.options);
      }
    };

    this.handleEvent(`vis_network:${this.props.id}:init`, ({ spec }) => {
      this.spec = spec;

      if(this.spec.options.autostart) {
        btn.innerText = "stop";
        this.state.network = new vis.Network(container, this.spec.data, this.spec.options);
      }
    });
  },

  updated() {
    this.props = getProps(this);
  },

  destroyed() {
    if (this.state.network) {
      this.state.network.destroy();
      this.state.network = null;
    }
  },
};

function getProps(hook) {
  return {
    id: getAttributeOrThrow(hook.el, "data-id"),
  };
}

export default VisNetwork;
