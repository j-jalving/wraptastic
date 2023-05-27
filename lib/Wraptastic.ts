import WraptasticList from "./WraptasticList";
import WraptasticListHor from "./WraptasticListHor";
import WraptasticListVer from "./WraptasticListVer";
import type { Config } from "./types";

export default class Wraptastic extends EventTarget {
  private config: Config;
  private listElems: WraptasticList[] = [];
  private allowedEventTypes: string[] = ["create", "update", "change"];

  constructor(config: Partial<Config> = {}) {
    super();
    // Default config
    this.config = {
      container: ".wraptastic",
      data: null,
      lines: 1,
      inline: true,
      item: ".wraptastic-item",
      itemClass: "wraptastic-item",
      counter: ".wraptastic-counter",
      counterClass: "wraptastic-counter",
      counterTemplate: (count): string => {
        return `+${count}`;
      },
      counterEnabled: true,
    };
    // Merge default config with config, if provided
    this.config = { ...this.config, ...config };
    // Create new WraptasticList instances for each list
    this.init();
  }

  /**
   * Create new WraptasticList instance for each container found on the page
   */
  init() {
    const listElems: NodeListOf<HTMLElement> = document.querySelectorAll(
      this.config.container + ",[data-wraptastic]"
    );
    // Loop through each item list
    Array.prototype.forEach.call(listElems, (listElem: HTMLElement) => {
      // Merge with data attributes config options
      const config = {
        ...this.config,
        ...this.getDataConfig(listElem),
      };
      // Determine the list type based on the inline config option
      if (config.inline) {
        // inline is true, create horizontal list
        this.listElems.push(new WraptasticListHor(listElem, config));
      } else {
        // inline is false, create vertical list
        this.listElems.push(new WraptasticListVer(listElem, config));
      }
    });
  }

  /**
   * Run the update method on all WraptasticList instances
   */
  update() {
    Array.prototype.forEach.call(this.listElems, (listElem: WraptasticList) => {
      listElem.update();
    });
  }

  /**
   * Create event listener
   */
  on(eventType: string, listener: () => void) {
    // Check if this is a valid event type
    if (!this.allowedEventTypes.includes(eventType)) {
      throw new Error(`Unknown event type ${eventType}`);
    }
    // Add the event listener for each list
    Array.prototype.forEach.call(this.listElems, (listElem: WraptasticList) => {
      listElem.addEventListener(eventType, listener);
    });
    // Return this to enable method chaining
    return this;
  }

  /**
   * Remove event listener
   */
  off(eventType: string, listener: () => void) {
    // Remove the event listener for each list
    Array.prototype.forEach.call(this.listElems, (listElem: WraptasticList) => {
      listElem.removeEventListener(eventType, listener);
    });
    // Return this to enable method chaining
    return this;
  }

  /**
   * Destroy all WraptasticList instances
   */
  destroy() {
    Array.prototype.forEach.call(this.listElems, (listElem: WraptasticList) => {
      listElem.destroy();
    });
    this.listElems.length = 0;
  }

  /**
   * Returns an object containing all config options set from data attributes
   */
  getDataConfig(element: HTMLElement): Partial<Config> {
    const config: Partial<Config> = {};
    if (element.dataset.wraptasticData) {
      config.data = JSON.parse(element.dataset.wraptasticData);
    }
    if (element.dataset.wraptasticLines) {
      config.lines = JSON.parse(element.dataset.wraptasticLines);
    }
    if (element.dataset.wraptasticInline) {
      config.inline = JSON.parse(element.dataset.wraptasticInline);
    }
    if (element.dataset.wraptasticItem) {
      config.item = element.dataset.wraptasticItem;
    }
    if (element.dataset.wraptasticItemClass) {
      config.itemClass = element.dataset.wraptasticItemClass;
    }
    if (element.dataset.wraptasticCounter) {
      config.counter = element.dataset.wraptasticCounter;
    }
    if (element.dataset.wraptasticCounterClass) {
      config.counterClass = element.dataset.wraptasticCounterClass;
    }
    if (element.dataset.wraptasticCounterTemplate) {
      config.counterTemplate = element.dataset.wraptasticCounterTemplate;
    }
    if (element.dataset.wraptasticCounterEnabled) {
      config.counterEnabled = JSON.parse(
        element.dataset.wraptasticCounterEnabled
      );
    }
    return config;
  }
}
