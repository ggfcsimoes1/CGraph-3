/*
Simple class that handles with the creation
of cones.
*/

var cone;

class Cone {
    constructor ( x,y,z, radius, height, radSegs, material, xRot=0, yRot=0, zRot=0 ) {
        this.x = x; //storing these for now, might remove later on
        this.y = y;
        this.z = z;
        this.radius = radius;
        this.height = height;
        this.radSegs = radSegs;
        this.xRot = xRot;
        this.yRot = yRot;
        this.zRot = zRot;
        this.material = material;
        this.geometry = new THREE.ConeGeometry ( radius, height, radSegs );
        this.mesh = new THREE.Mesh ( this.geometry, this.material );
        
        cone = new THREE.Object3D ( );
        cone.position.set ( x, y, z );
        cone.rotation.set( xRot, yRot, zRot);
        cone.add ( this.mesh );

        this.obj3D = cone;
        
    }
    //returns the created mesh
    getMesh() {
        return this.mesh;
    }
    //returns the Object3D instance
    getObj3D() {
        return this.obj3D;
    }
}
