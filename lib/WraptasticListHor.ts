import type { Config } from "./types";
import WraptasticList from "./WraptasticList";

export default class WraptasticListHor extends WraptasticList {
  protected currentLine = 1;

  constructor(listElem: HTMLElement, config: Config) {
    super(listElem, config);
  }

  /**
   * This method updates the list to hide all items overflowing beyond the
   * maximum number of allowed lines. If necesary it also updates the counter to
   * show the amount of items overflowing.
   */
  public update() {
    // Reset current line
    this.currentLine = 1;
    // Get all the items that are in the list right now
    const items: NodeListOf<HTMLElement> = this.getListItems();
    // Keep track if the number of overflowing items
    let overflowCount = 0;
    // Are there enough items to overflow the available lines?
    if (items.length > this.config.lines) {
      //Yes, first hide all items starting from the second one
      for (let index = 1; index < items.length; index++) {
        this.hideItem(items[index]);
      }
      // Then process all items starting from the second one
      for (let index = 1; index < items.length; index++) {
        const item = items[index];
        const prevItem = items[index - 1];
        const isLastItem = index === items.length - 1;
        // Set the number of overflowing items, it starts at this item
        overflowCount = items.length - index;
        // Update the counter label to reflect the current overflowing count
        this.updateCounterLabel(overflowCount);
        // Check if this item is on a visible line
        const isOnVisibleLine: boolean = this.isOnVisibleLine(
          item,
          prevItem,
          isLastItem
        );

        if (isOnVisibleLine) {
          // Yes, it's on a visible line
          if (isLastItem) {
            // This was the last item we can hide the counter
            this.hideCounter();
            // Update the counter label, for posterity's sake
            this.updateCounterLabel(0);
            // And move the counter label to the end of the list
            if (this.counterElem) {
              this.listElem.appendChild(this.counterElem);
            }
          }
        } else {
          // No, hide the element
          this.hideItem(item);
          // No, check if the counter also is on an invisble line;
          if (
            this.counterElem &&
            this.isOverflowing(this.counterElem, prevItem)
          ) {
            // Counter is on invisible line as well, hide it
            this.hideCounter();
          }
          // We can exit the loop now
          break;
        }
      }
    } else {
      // No, overflow is impossible so we can simply show everything
      Array.prototype.forEach.call(items, (item) => this.showItem(item));
      // And hide the counter
      this.hideCounter();
    }
    // Wrap up update cycle
    this.afterUpdate(overflowCount);
  }

  /**
   * Destroy this instance
   */
  public destroy() {
    super.destroy();
  }

  /**
   * This method determines if the given item is overflowing beyond the amount
   * of allowed lines.
   */
  protected isOnVisibleLine(
    item: HTMLElement,
    prevItem: HTMLElement,
    isLastItem: boolean
  ): boolean {
    // Make sure the item is visible
    this.showItem(item);
    // Are we currently on the last visible line?
    if (this.isVisibleLine(this.currentLine + 1)) {
      // Next line still visible, hide the counter
      this.hideCounter();
      // Check if the current item is still overflowing
      if (!isLastItem && this.isOverflowing(item, prevItem)) {
        // Yes, increase the current line number
        this.currentLine += 1;
      }
      return true;
    }
    // Place the counter before this item
    this.moveCounterBefore(item);
    // We're on the last visible line, we need to check for overflows
    this.showCounter();

    // Is the item overflowing?
    if (this.isOverflowing(item, prevItem)) {
      // Yes it's overflowing, what happens when we hide the counter
      this.hideCounter();
      // Does it still overflow when the counter is hidden?
      if (this.isOverflowing(item, prevItem)) {
        // Yes, increase the current line number
        this.currentLine += 1;
      } else if (isLastItem) {
        // It's is not overflowing anymore, and it's the last item.
        return true;
      }
      this.showCounter();
    } else {
      // Is it overflowing with the counter visible;
      // Not overflowing
      return true;
    }
    // It's on an invisible line, counter needs to be visible
    return false;
  }

  /**
   * Checks if the given item is overflowing.
   */
  protected isOverflowing(item: HTMLElement, prevItem: HTMLElement): boolean {
    return item.offsetLeft <= prevItem.offsetLeft + prevItem.offsetWidth;
  }

  /**
   * Checks if the given line is a visible or invisible line.
   */
  protected isVisibleLine(line: number): boolean {
    return line <= this.config.lines;
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
