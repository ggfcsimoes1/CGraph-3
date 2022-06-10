/*
The planet that is used in the game.
*/
var palanque;

class Palanque {
    constructor ( x,y,z, height, width, length, color) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.width = width;
        this.length = length;
        this.height = height;
        this.color = color;

        this.group = new THREE.Group ( );
        
        let material = new THREE.MeshBasicMaterial ( { color: color, wireframe: false } );
        let geometry = new THREE.BoxGeometry ( width, height/2, length );
        let mesh = new THREE.Mesh ( geometry, material );
        
        let box = new THREE.Object3D ( );
        box.position.set(0, height/4, 0);
        box.add ( mesh );

        this.group.add(box);

        material = new THREE.MeshBasicMaterial ( { color: color + 100, wireframe: false } );
        geometry = new THREE.BoxGeometry ( width, height/2, length/2 );
        mesh = new THREE.Mesh ( geometry, material );

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
    //returns the object's color
    getColor() {
        return this.color;
    }
    //returns the group created in the constructor
    getGroup() {
        return this.group;
    }
}
