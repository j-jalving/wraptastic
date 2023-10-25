import EventTarget from "@ungap/event-target";
import WraptasticList from "./WraptasticList";
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
      minLines: 1,
      maxLines: 1,
      item: ".wraptastic-item",
      itemClass: "wraptastic-item",
      counter: ".wraptastic-counter",
      counterClass: "wraptastic-counter",
      counterTemplate: (count): string => {
        return `+${count}`;
      },
      counterEnabled: true,
      updateEvery: 0,
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
      // Create WraptasticList instance
      this.instances.push(new WraptasticList(listElem, config));
    });
    // Return this to enable method chaining
    return this;
  }

  /**
   * Run the update method on all WraptasticList instances
   */
  public update() {
    Array.prototype.forEach.call(this.instances, (instance: WraptasticList) => {
      instance.update();
    });
    // Return this to enable method chaining
    return this;
  }

  /**
   * Destroy all WraptasticList instances
   */
  public destroy() {
    Array.prototype.forEach.call(this.instances, (instance: WraptasticList) => {
      instance.destroy();
    });
    this.instances.length = 0;
    // Return this to enable method chaining
    return this;
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
    if (element.dataset.wraptasticMinLines) {
      config.minLines = JSON.parse(element.dataset.wraptasticMinLines);
    }
    if (element.dataset.wraptasticMaxLines) {
      config.maxLines = JSON.parse(element.dataset.wraptasticMaxLines);
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
    if (element.dataset.wraptasticUpdateEvery) {
      config.updateEvery = JSON.parse(element.dataset.wraptasticUpdateEvery);
    }
    return config;
  }
}
