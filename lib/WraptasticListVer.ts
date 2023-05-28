import type { Config } from "./types";

import WraptasticList from "./WraptasticList";

export default class WraptasticListVer extends WraptasticList {
  constructor(listElem: HTMLElement, config: Config) {
    super(listElem, config);
  }

  /**
   * Destroy this instance
   */
  public destroy() {
    super.destroy();
  }

  /**
   * This method updates the list to hide all items overflowing beyond the
   * maximum number of allowed lines. If necesary it also updates the counter to
   * show the amount of items overflowing.
   */
  public update() {
    // Get all the items in the list
    const items: NodeListOf<HTMLElement> = this.getListItems();
    // Save the numer of overflowing items
    let overflowCount = 0;
    // First we hide all items
    Array.prototype.forEach.call(items, (item) => {
      this.hideItem(item);
    });
    // Show the counter
    this.showCounter();
    // Loop through the items one by one
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      // Check if this is the last item
      if (index === items.length - 1) {
        // Update overflow count
        overflowCount = 0;
        // Yes, hide the counter
        this.hideCounter();
      }
      // Show the item
      this.showItem(item);
      // Check if the item should be hidden
      if (this.isOverflowing() || index >= this.config.lines) {
        // Yes, hide item again
        this.hideItem(item);
        // Update the number of overflowing items
        overflowCount = items.length - index;
        // Break out of the loop
        break;
      }
    }
    // Update the counter label to reflect the current overflowing count
    this.updateCounterLabel(overflowCount);
    // Wrap up update cycle
    this.afterUpdate(overflowCount);
  }

  /**
   * Checks if the container is overflowing.
   */
  protected isOverflowing(): boolean {
    const clientHeight = this.listElem.clientHeight;
    const scrollHeight = this.listElem.scrollHeight;
    return scrollHeight > clientHeight;
  }
}
