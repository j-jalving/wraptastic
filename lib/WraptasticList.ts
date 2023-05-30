import type { Config } from "./types";
import throttle from "lodash/throttle";

export default class WraptasticList extends EventTarget {
  protected config: Config;
  protected listElem: HTMLElement;
  protected counterElem?: HTMLElement;
  protected createdElems: HTMLElement[] = [];
  protected visibleOffsets: number[] = [];
  protected overflowCount: number | undefined;
  protected resizeObserver: ResizeObserver;

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
    this.counterElem =
      this.listElem.querySelector(this.config.counter) ?? undefined;
    if (!this.counterElem && this.config.counterEnabled) {
      // Yes, let's create it
      this.createCounter();
    }
    // Add data-wraptastic-init attribute so we know it has been initialized
    this.listElem.setAttribute("data-wraptastic-init", "");
    // React to size changes of the list element
    this.resizeObserver = new ResizeObserver(
      throttle(this.update.bind(this), this.config.updateEvery)
    );
    this.resizeObserver.observe(this.listElem);
    // Emit create event, wait a tick to be sure event listeners are registered
    window.setTimeout(this.triggerCreateEvent.bind(this));
  }

  /**
   * This method makes sure the proper items are shown and hidden and the
   * counter is updated.
   */
  public update() {
    // Get all the items that are in the list right now
    const items: NodeListOf<HTMLElement> = this.getListItems();
    // Reset visble offets
    this.visibleOffsets = [];
    // Track overflowCount
    let overflowCount = 0;
    // Are there enough items to fill the available lines?
    if (items.length + 1 > this.config.maxLines) {
      // Yes, get all visible list items
      const visibleItems: NodeListOf<HTMLElement> = this.getVisibleListItems();
      // Then hide all visible items
      Array.prototype.forEach.call(visibleItems, (item) => this.hideItem(item));
      // Show the counter
      this.showCounter();
      // Set index
      let index = 0;
      // Then show and check all items one by one
      for (index; index < items.length; index++) {
        const item = items[index];
        const itemPrev = items[index - 1];
        const isLastItem = index === items.length - 1;
        // Update the overflow count (minus one to account for hiding item)
        overflowCount = items.length - index - 1;
        // Update the counter label
        this.updateCounterLabel(overflowCount);
        // Show the current item
        this.showItem(item);
        // Add item offset to the list of allowed offsets
        this.addOffset(item.offsetTop);
        // Check if the container is overflowing
        if (this.isOverflowing()) {
          // Container is overflowing, do we need to hide this item?
          if (!this.isMinimumOffset(item.offsetTop)) {
            // Yes, hide this item
            this.hideItem(item);
            // We can exit the loop now
            break;
          }
        }
        // Is counter enabled and is this item not the last?
        if (this.counterElem && !isLastItem) {
          // Yes, is the container overflowing?
          if (this.isOverflowing()) {
            // Yes, is this item on a hidden line?
            if (!this.isMinimumOffset(this.counterElem.offsetTop)) {
              // Yes, hide this item
              this.hideItem(item);
              // We can exit the loop now
              break;
            }
          }
          // Add offset to the list of allowed offsets
          this.addOffset(this.counterElem.offsetTop);
          // Is the counter wrapped to the next line?
          if (this.isBelow(this.counterElem, item)) {
            //Wrapped, check if it's now on a hidden line
            if (!this.isVisibleOffset(this.counterElem.offsetTop)) {
              // Counter is on hidden line, is this the last item?
              this.hideItem(item);
              // We can exit the loop now
              break;
            }
          }
        }
        // Is the item wrapped to the next line?
        if (itemPrev && this.isBelow(item, itemPrev)) {
          // Is the counter on on a hidden line?
          if (!this.isVisibleOffset(item.offsetTop)) {
            // Item is on hidden line, hide item
            this.hideItem(item);
            // Item is on hidden line, we can exit the loop now
            break;
          }
        }
      }
      // Update the overflow count
      overflowCount = items.length - index;
    } else {
      // Get all hidden list items
      const hiddenItems: NodeListOf<HTMLElement> = this.getHiddenListItems();
      // Overflow is impossible so we can simply show everything
      Array.prototype.forEach.call(hiddenItems, (item) => this.showItem(item));
    }
    // Update the counter label
    this.updateCounterLabel(overflowCount);
    // Are there any overflowing items?
    if (!overflowCount) {
      // No items are overflowing, hide the counter
      this.hideCounter();
    }
    // Finished rendering, wait a tick to be sure event listeners are registered
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
   * Destroy this instances
   */
  public destroy() {
    // Remove all previously created elements from the DOM
    Array.prototype.forEach.call(this.createdElems, (element) => {
      element.remove();
    });
    // Unobserve resize observer
    this.resizeObserver.unobserve(this.listElem);
    // Remove data-wraptastic-init attribute so we know it has not been
    // initialized
    this.listElem.removeAttribute("data-wraptastic-init");
  }

  /**
   * Create new item elements inside the list
   */
  protected createItems(items: string[]) {
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
  protected createCounter() {
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
  protected getItemType(): string {
    // Get the element type for the list
    const containerType: string = this.listElem.tagName;
    // Return the element type for the item
    if (containerType === "UL" || containerType === "OL") {
      return "li";
    } else if (containerType === "SPAN") {
      return "span";
    } else {
      return "div";
    }
  }

  /**
   *
   * @returns Returns all list items inside this container
   */
  protected getListItems(): NodeListOf<HTMLElement> {
    return this.listElem.querySelectorAll(
      `${this.config.item}:not(${this.config.counter})`
    );
  }

  /**
   *
   * @returns Returns all visible list items inside this container
   */
  protected getVisibleListItems(): NodeListOf<HTMLElement> {
    return this.listElem.querySelectorAll(
      `${this.config.item}:not(${this.config.counter})` +
        `:not([data-wraptastic-hidden])`
    );
  }

  /**
   *
   * @returns Returns all hidden list items inside this container
   */
  protected getHiddenListItems(): NodeListOf<HTMLElement> {
    return this.listElem.querySelectorAll(
      `${this.config.item}:not(${this.config.counter})` +
        `[data-wraptastic-hidden]`
    );
  }

  /**
   * Updates the label of the counter element using the counter template
   */
  protected updateCounterLabel(count: number) {
    // Check if the counter needs to be updated
    if (this.counterElem && this.config.counterEnabled) {
      // Yes, check if the counterTemplate is function
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
   * Add offset to the array containing offsets for all visible lines
   */
  protected addOffset(offset: number) {
    // Only add unique offsets
    if (!this.visibleOffsets.includes(offset)) {
      this.visibleOffsets.push(offset);
    }
    // Truncate array to lines config option
    this.visibleOffsets = this.visibleOffsets.slice(0, this.config.maxLines);
  }

  /**
   * Hides the given item
   */
  protected hideItem(item?: HTMLElement) {
    if (item) {
      item.style.display = "none";
      item.setAttribute("wraptastic-hidden", "");
    }
  }

  /**
   * Shows the given item
   */
  protected showItem(item?: HTMLElement) {
    if (item) {
      item.style.display = "";
      item.removeAttribute("wraptastic-hidden");
    }
  }

  /**
   * Hides the counter
   */
  protected hideCounter() {
    this.hideItem(this.counterElem);
  }

  /**
   * Shows the counter
   */
  protected showCounter() {
    this.showItem(this.counterElem);
  }

  /**
   * Returns true if the container is overflowing
   */
  protected isOverflowing(): boolean {
    const scrollHeight = this.listElem.scrollHeight;
    const clientHeight = this.listElem.clientHeight;
    const scrollWidth = this.listElem.scrollWidth;
    const clientWidth = this.listElem.clientWidth;
    return scrollHeight > clientHeight || scrollWidth > clientWidth;
  }

  /**
   * Returns true if item1 is below item 2
   */
  protected isBelow(item1: HTMLElement, item2: HTMLElement) {
    return item1.offsetTop > item2.offsetTop;
  }

  /**
   * Returns true if the given offset is in the list of visible offsets
   */
  protected isVisibleOffset(offset: number): boolean {
    return this.visibleOffsets.includes(offset);
  }

  /**
   * Returns true if the given offset is in the list of minimum visible offsets
   */
  protected isMinimumOffset(offset: number): boolean {
    return this.visibleOffsets.slice(0, this.config.minLines).includes(offset);
  }

  /**
   * Trigger create event
   */
  protected triggerCreateEvent() {
    const event = new CustomEvent("create", {
      detail: { element: this.listElem },
    });
    this.dispatchEvent(event);
  }

  /**
   * Trigger update event
   */
  protected triggerUpdateEvent() {
    const event = new CustomEvent("update", {
      detail: { element: this.listElem },
    });
    this.dispatchEvent(event);
  }

  /**
   * Trigger change event
   */
  protected triggerChangeEvent(count: number, oldCount: number | undefined) {
    const event = new CustomEvent("change", {
      detail: {
        element: this.listElem,
        count,
        oldCount,
      },
    });
    this.dispatchEvent(event);
  }
}
