'use strict';

const { expect } = require( 'chai' );
const { Project } = require( '../lib/project.js' );

describe( 'Project', () => {
    it( 'can add features & artifacts', done => {
        const proj = new Project();
        proj.addFeature( { id:7, name: 'Can add' } );
        proj.addFeature( { name: 'Can delete', cost: 3 } );
        proj.addArtifact( { name: 'v.0.1' } );
        proj.link( 7, 1 );
        proj.link( 8, 1 );
        expect( proj.artifacts.list()[0].cost() ).to.equal(4);
        done();
    });
});

