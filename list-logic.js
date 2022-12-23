const priorityLevels = ['low', 'normal', 'high'];


class List {
    constructor(category, name, items={}, priority='normal') {
        this.category = category;
        this.name = name;
        this.items = items;
        this.priority = priority;
        this.tags = [];
    }

        // setting up our getters -- remember 'get' keyword
        get name() { this.name };
        get category() {
            return this.category;
        }
        /* generator method...asterisk is a 'keyword' indicating generator...for-of gives arr values instead of iterator
           we use yield instead of return so that it doesn't...return.. */
        *getItems() {
            for (const item of this.items) {
                yield item;
            }
        }
        get priority() {
            return this.priority
        }
        *getTags() {
            if (tags) {
                for (const tag in this.tags) {
                    yield tag;
                }
            /* need to come back later and update handling...not yet sure how lists will be 
               managed once created */
            } else {
                return 'No tags found! Add a tag using ...'
            }
        }
        
        // declaring our setters & add methods
        set name(newName) {
            this.name = newName;
        }
        set priority(newPriority) {
            this.priority = newPriority;
            return 'Priority succesfully updated!'
        }
        addItem(item) {
            if (Object.values(this.items).includes(item)) { 
                return 'Error! Item already exists in list.';
            } else {
                let itemNum = Object.keys(this.items).length+1;
                this.items[itemNum] = item;
                return `Successfully added item to ${this.name}`
            } 
        }
}