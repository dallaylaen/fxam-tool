'use strict';

const { expect } = require( 'chai' );
const { Ordered } = require( '../lib/ordered.js' );

describe( 'Ordered', () => {
    const foo = { id : 42 };
    const bar = { id : 137 };
    const qux = { id : 314 };
    const zzz = { id : 451 };

    it( 'can add, move, and delete items', done => {
        const o = new Ordered();
        expect( o.length() ).to.equal( 0 );

        expect( o.set( foo ) ).to.equal( o );
        expect( o.length() ).to.equal( 1 );
        o.set( bar );
        o.set( qux );
        expect( o.list() ).to.deep.equal( [ foo, bar, qux ] );

        o.set( foo, 1 );
        expect( o.list() ).to.deep.equal( [ bar, foo, qux ] );

        o.set( zzz, 1 );
        expect( o.list() ).to.deep.equal( [ bar, zzz, foo, qux ] );

        o.remove( foo.id );
        expect( o.list() ).to.deep.equal( [ bar, zzz, qux ] );

        o.remove( foo.id );
        expect( o.list() ).to.deep.equal( [ bar, zzz, qux ] );

        o.set( { id: 137, replace:true } );
        expect( o.list() ).to.deep.equal( [ { id: 137, replace:true }, zzz, qux ] );

        expect( o.get(foo.id) ).to.equal( undefined );
        expect( o.get(zzz.id) ).to.deep.equal( zzz );
        expect( o.get(bar.id) ).to.deep.equal( { id: 137, replace:true } );


        expect( o.indexOf(bar) ).to.equal( -1 );
        expect( o.indexOf(foo) ).to.equal( -1 );
        expect( o.indexOf(zzz) ).to.equal( 1 );

        expect( o.nth(2) ).to.equal( qux );
        expect( o.nth(1) ).to.equal( zzz );
        expect( o.length() ).to.equal( 3 );

        done();
    });
});
