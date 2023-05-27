import type { Config } from "./types";

export default class WraptasticList extends EventTarget {
  protected config: Config;
  protected listElem: HTMLElement;
  protected counterElem: HTMLElement | null;
  protected createdElems: HTMLElement[] = [];
  protected overflowCount: number | undefined;
  protected boundUpdate;

  constructor(listElem: HTMLElement, config: Config) {
    super();
    // Set properties
    this.listElem = listElem;
    this.config = config;
    // Check if list items are set in the config
    if (this.config.data) {
      // Yes, let's create them
      this.createItems(this.config.data);
    }
    // Check if a counter element does not exist and the config value is set
    this.counterElem = this.listElem.querySelector(this.config.counter);
    if (!this.counterElem && this.config.counterEnabled) {
      // Yes, let's create it
      this.createCounter();
    }
    // Emit create event, wait a tick to be sure event listeners are registered
    window.setTimeout(this.triggerCreateEvent.bind(this));
    // Create a bound version of the update method to easily add and remove
    // listeners with
    this.boundUpdate = this.update.bind(this);
  }

  /**
   * This is where the magic happens
   */
  update(): void {}

  /**
   * Handles everything that should happen after a list has finished its update
   * cycle
   */
  afterUpdate(overflowCount: number): void {
    // Wait a tick to be sure event listeners are registered
    window.setTimeout(() => {
      // Trigger update event
      this.triggerUpdateEvent();
      // Also check if the overflow count has changed
      if (overflowCount !== this.overflowCount) {
        // Yes, trigger change event
        this.triggerChangeEvent(overflowCount, this.overflowCount);
      }
      // Update overflow Count
      this.overflowCount = overflowCount;
    });
  }

  /**
   * Create new item elements inside the list
   */
  createItems(items: string[]) {
    // Get element type
    const itemType: string = this.getItemType();
    // Loop through all given items
    Array.prototype.forEach.call(items, (item: string) => {
      // Create a new item element
      const element = document.createElement(itemType);
      element.className = this.config.itemClass;
      element.textContent = item;
      // Add it to the list element
      this.listElem.appendChild(element);
      // Add it to the created items list, so we can remove it later
      this.createdElems.push(element);
    });
  }

  /**
   * Create a new counter element at the end of the list
   */
  createCounter() {
    // Get element type
    const itemType: string = this.getItemType();
    // Create a new counter element
    this.counterElem = document.createElement(itemType);
    this.counterElem.className = this.config.counterClass;
    this.updateCounterLabel(0);
    this.hideCounter();
    // Add it to the list element
    this.listElem.appendChild(this.counterElem);
    // Add it to the created items list, so we can remove it later
    this.createdElems.push(this.counterElem);
  }

  /**
   * Returns the type of element that should be used for the list items
   */
  getItemType(): string {
    // Get the element type for the list
    const containerType: string = this.listElem.tagName;
    // Return the element type for the item
    if (containerType === "UL" || containerType === "OL") {
      return "li";
    } else if (this.config.inline) {
      return "span";
    } else {
      return "li";
    }
  }

  getListItems(): NodeListOf<HTMLElement> {
    return this.listElem.querySelectorAll(
      `${this.config.item}:not(${this.config.counter})`
    );
  }

  /**
   * Updates the label of the counter element using the counter template
   */
  updateCounterLabel(count: number) {
    // Check if the counter needs to be updated
    if (this.counterElem && this.config.counterEnabled) {
      // Yes, heck if the counterTemplate is fucntion
      if (typeof this.config.counterTemplate === "function") {
        // Yes, get new value from the counterTemplate method
        this.counterElem.textContent = this.config.counterTemplate(count);
      } else {
        // No, parse the string to get the new value
        this.counterElem.textContent = this.config.counterTemplate.replace(
          "{count}",
          count.toString()
        );
      }
    }
  }

  /**
   * Hides the given item
   */
  hideItem(item: HTMLElement) {
    if (item) {
      item.style.display = "none";
    }
  }

  /**
   * Shows the given item
   */
  showItem(item: HTMLElement) {
    if (item) {
      item.style.display = "";
    }
  }

  /**
   * Hides the counter
   */
  hideCounter() {
    if (this.counterElem) {
      this.counterElem.style.display = "none";
    }
  }

  /**
   * Shows the counter
   */
  showCounter() {
    if (this.counterElem) {
      this.counterElem.style.display = "";
    }
  }

  /**
   * Trigger create event
   */
  triggerCreateEvent() {
    const event = new CustomEvent("create", {
      detail: { element: this.listElem },
    });
    this.dispatchEvent(event);
  }

  /**
   * Trigger update event
   */
  triggerUpdateEvent() {
    const event = new CustomEvent("update", {
      detail: { element: this.listElem },
    });
    this.dispatchEvent(event);
  }

  /**
   * Trigger change event
   */
  triggerChangeEvent(count: number, oldCount: number | undefined) {
    const event = new CustomEvent("change", {
      detail: {
        element: this.listElem,
        count,
        oldCount,
      },
    });
    this.dispatchEvent(event);
  }

  /**
   * Destroy this instances
   */
  destroy() {
    // Remove all previously created elements from the DOM
    Array.prototype.forEach.call(this.createdElems, (element) => {
      element.remove();
    });
  }
}
