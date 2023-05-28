import WraptasticList from "./WraptasticList";
import WraptasticListHor from "./WraptasticListHor";
import WraptasticListVer from "./WraptasticListVer";
import type { Config } from "./types";

export default class Wraptastic extends EventTarget {
  private config: Config;
  private instances: WraptasticList[] = [];
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
  public init() {
    const listElems: NodeListOf<HTMLElement> = document.querySelectorAll(
      this.config.container + ",[data-wraptastic]"
    );
    // Loop through each item list
    Array.prototype.forEach.call(listElems, (listElem: HTMLElement) => {
      // Skip if this element has already been initialized
      if (listElem.hasAttribute("data-wraptastic-init")) return;
      // Merge with data attributes config options
      const config = {
        ...this.config,
        ...this.getDataConfig(listElem),
      };
      // Determine the list type based on the inline config option
      if (config.inline) {
        // inline is true, create horizontal list
        this.instances.push(new WraptasticListHor(listElem, config));
      } else {
        // inline is false, create vertical list
        this.instances.push(new WraptasticListVer(listElem, config));
      }
    });
  }

  /**
   * Run the update method on all WraptasticList instances
   */
  public update() {
    Array.prototype.forEach.call(this.instances, (instance: WraptasticList) => {
      instance.update();
    });
  }

  /**
   * Destroy all WraptasticList instances
   */
  public destroy() {
    Array.prototype.forEach.call(this.instances, (instance: WraptasticList) => {
      instance.destroy();
    });
    this.instances.length = 0;
  }

  /**
   * Create event listener
   */
  public on(eventType: string, listener: () => void) {
    // Check if this is a valid event type
    if (!this.allowedEventTypes.includes(eventType)) {
      throw new Error(`Unknown event type ${eventType}`);
    }
    // Add the event listener for each list
    Array.prototype.forEach.call(this.instances, (instance: WraptasticList) => {
      instance.addEventListener(eventType, listener);
    });
    // Return this to enable method chaining
    return this;
  }

  /**
   * Remove event listener
   */
  public off(eventType: string, listener: () => void) {
    // Remove the event listener for each list
    Array.prototype.forEach.call(this.instances, (instance: WraptasticList) => {
      instance.removeEventListener(eventType, listener);
    });
    // Return this to enable method chaining
    return this;
  }

  /**
   * Returns an object containing all config options set from data attributes
   */
  protected getDataConfig(element: HTMLElement): Partial<Config> {
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
