import type { Config } from "./types";

import WraptasticList from "./WraptasticList";

export default class WraptasticListVer extends WraptasticList {
  constructor(listElem: HTMLElement, config: Config) {
    super(listElem, config);
    // Update methods only needs to be called once for vertical lists
    if (document.readyState == "complete") {
      // Document was already loaded
      this.update();
    } else {
      // Wait for document to finish loading
      window.addEventListener("load", this.boundUpdate);
    }
  }

  /**
   * Destroy this instance
   */
  public destroy() {
    super.destroy();
    // Remove event listeners
    window.removeEventListener("load", this.boundUpdate);
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
    // Loop through the items
    Array.prototype.forEach.call(items, (item, index) => {
      if (index < this.config.lines) {
        // Visible line, show the item
        this.showItem(item);
      } else {
        // Hidden line, hide the item
        this.hideItem(item);
        // Add it to the number of overflowing items
        overflowCount += 1;
      }
    });
    // Update the counter label to reflect the current overflowing count
    this.updateCounterLabel(overflowCount);
    // Show the counter if there are overflowing items
    if (overflowCount > 0) {
      this.showCounter();
    } else {
      this.hideCounter();
    }
    // Wrap up update cycle
    this.afterUpdate(overflowCount);
  }
}
