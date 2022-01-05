
/* a set if items with ids that preserves order */
class Ordered {
    constructor() {
        this.data = {};
        this.index = [];
    }
    set(item, place) {
        // figure out moving
        if (place !== undefined) {
            // known, place      => delete + insert
            if (this.data[item.id])
                this.index.splice(this.index.indexOf(item.id), 1);
            // unknown, place    => insert
            this.index.splice(place, 0, item.id);
        } else if( !this.data[item.id] ) {
            // unknown, no place => place = last
            this.index.push( item.id );
        } else {
            // known, no place   => do nothing
        }

        // easy part
        this.data[item.id] = item;
        return this;
    }
    get(id) {
        return this.data[id];
    }
    list() {
        return this.index.map( n => this.data[n] );
    }
    remove(id) {
        if( this.data[id] ) {
            this.index.splice( this.index.indexOf(id), 1 );
            delete this.data[id];
        }
        return this;
    }
    indexOf(item) {
        for( let i = 0; i<this.index.length; i++ )
            if( this.data[ this.index[ i ]] === item )
                return i;
        return -1;
    }
    nth(n) {
        // TODO name!
        return this.data[ this.index[ n ]];
    }
}

module.exports = { Ordered };
