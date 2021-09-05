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
      container: null,
      network: null,
    };

    this.state.container = document.createElement("div");
    this.el.appendChild(this.state.container);

    this.handleEvent(`vis_network:${this.props.id}:init`, ({ spec }) => {
      if (!spec.data) {
        spec.data = { values: [] };
      }

      this.state.network = new vis.Network(this.state.container, spec.data, spec.options);
    });
  },

  updated() {
    this.props = getProps(this);
  },

  destroyed() {
    if (this.state.network) {
      this.state.network.destroy();
    }
  },
};

function getProps(hook) {
  return {
    id: getAttributeOrThrow(hook.el, "data-id"),
  };
}

export default VisNetwork;
