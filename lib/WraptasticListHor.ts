import type { Config } from "./types";
import WraptasticList from "./WraptasticList";

export default class WraptasticListHor extends WraptasticList {
  protected resizeObserver: ResizeObserver = new ResizeObserver(
    this.boundUpdate
  );

  constructor(listElem: HTMLElement, config: Config) {
    super(listElem, config);
    // Set up event listeners for on load and when the window resizes
    if (document.readyState == "complete") {
      // Document was already loaded
      this.update();
    } else {
      // Wait for document to finish loading
      window.addEventListener("load", this.boundUpdate);
    }
    // React to size changes of the list element
    this.resizeObserver.observe(this.listElem);
  }

  /**
   * This method updates the list to hide all items overflowing beyond the
   * maximum number of allowed lines. If necesary it also updates the counter to
   * show the amount of items overflowing.
   */
  public update() {
    // Get all the items that are in the list right now
    const items: NodeListOf<HTMLElement> = this.getListItems();
    // Get allowed offsets
    const allowedOffsets = this.getAllowedOffsets(items);
    // Keep track if the number of overflowing items
    let overflowCount = 0;
    // Are there enough items to overflow the available lines?
    if (items.length <= this.config.lines) {
      // No, we can just show all items
      Array.prototype.forEach.call(items, (item) => this.showItem(item));
      // Hide the counter
      this.hideCounter();
    } else {
      // Hide all items starting from the second
      for (let index = 1; index < items.length; index++) {
        this.hideItem(items[index]);
      }
      // Process all items starting from the second
      for (let index = 1; index < items.length; index++) {
        // Get the current item
        const item = items[index];
        // Set the overflow count, assuming the overflow starts at this item
        overflowCount = items.length - index;
        // Check if this is the last item in the list
        const isLastItem = index === items.length - 1;
        // Update the counter label to reflect the current overflowing count
        this.updateCounterLabel(overflowCount);
        // Place the counter before this item
        this.moveCounterBefore(item);
        // Check if this item is overflowing
        const isOverflowing: boolean = this.isOverflowing(
          item,
          isLastItem,
          allowedOffsets
        );
        // Is this item overflowing?
        if (isOverflowing) {
          // Check if the counter also overflows;
          if (
            this.counterElem &&
            !allowedOffsets.includes(this.counterElem.offsetTop)
          ) {
            // Counter overflows as well, hide it
            this.hideCounter();
          }
          // We can exit the loop now
          break;
        } else if (isLastItem) {
          // This was the last item and there were no overflows detected, set
          // the overflow count to 0
          overflowCount = 0;
          // Update the counter label, for posterity's sake
          this.updateCounterLabel(overflowCount);
          // And move the counter label to the end of the list
          if (this.counterElem) {
            this.listElem.appendChild(this.counterElem);
          }
        }
      }
    }
    // Wrap up update cycle
    this.afterUpdate(overflowCount);
  }

  /**
   * Destroy this instance
   */
  public destroy() {
    super.destroy();
    // Remove event listeners
    window.removeEventListener("load", this.boundUpdate);
    this.resizeObserver.unobserve(this.listElem);
  }

  /**
   * This method determines if the current item is overflowing beyond the amount
   * of allowed lines. It does so by quickly displaynig it and then checking if
   * it's offset is in the allowed offsets list.
   */
  protected isOverflowing(
    item: HTMLElement,
    isLastItem: boolean,
    allowedOffsets: number[]
  ): boolean {
    // Make sure the item is visible
    this.showItem(item);
    // Check if the item is on a line that should be overflowing
    if (!allowedOffsets.includes(item.offsetTop)) {
      // Overflowing, check if it's the last item
      if (isLastItem) {
        // Last item, maybe it will fit without the counter
        this.hideCounter();
        // Check if the item is still overflowing without the counter before it
        if (allowedOffsets.includes(item.offsetTop)) {
          // Not overflowing anymore, return overflowing false
          return false;
        }
        // Still overflowing, show the counter again
        this.showCounter();
      }
      // Hide the item again
      this.hideItem(item);
      // Return overflowing true
      return true;
    }
    // Not overflowing, check if it's the last item and the counter is enabled
    if (isLastItem && this.counterElem) {
      // Last item, so all items fit. We can now hide the counter
      this.hideCounter();
      // Lets move it to the back of the list as well
      this.listElem.appendChild(this.counterElem);
    }
    // Return overflowing false
    return false;
  }

  /**
   * Returns an array containing the offsetTop for each allowed line
   */
  protected getAllowedOffsets(items: NodeListOf<HTMLElement>): number[] {
    // Hide the counter element
    this.hideCounter();
    const offsets: number[] = [];
    Array.prototype.forEach.call(items, (item) => {
      // Show the item
      this.showItem(item);
      // Add its offset to the list
      offsets.push(item.offsetTop);
    });
    // Keep only unique values
    const uniqueOffsets = [...new Set(offsets)];
    // Show the counter again
    this.showCounter();
    // Return only the offsets for the amount of lines we want to display
    return uniqueOffsets.slice(0, this.config.lines);
  }

  /**
   * Places the counter element before the given item
   */
  protected moveCounterBefore(item: HTMLElement) {
    if (item && this.counterElem) {
      this.listElem.insertBefore(this.counterElem, item);
    }
  }
}
