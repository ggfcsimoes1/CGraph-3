/*
The planet that is used in the game.
*/
var palanque;

class Palanque {
    constructor ( x,y,z, height, width, length, material) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.width = width;
        this.length = length;
        this.height = height;
        this.material = material;

        this.group = new THREE.Group ( );

        let geometry = new THREE.BoxGeometry ( width, height/2, length );
        let mesh = new THREE.Mesh ( geometry, this.material );
        
        let box = new THREE.Object3D ( );
        box.position.set(0, height/4, 0);
        box.add ( mesh );

        this.group.add(box);

        geometry = new THREE.BoxGeometry ( width, height/2, length/2 );
        mesh = new THREE.Mesh ( geometry, this.material );

        box = new THREE.Object3D ( );
        box.add ( mesh );
        box.position.set(0, height * (3/4), -length/4);

        this.group.add(box);

        this.group.position.set(x, y, z);
        
    }
    //returns the created mesh
    getMesh() {
        return this.mesh;
    }
    //returns the group created in the constructor
    getGroup() {
        return this.group;
    }
}
