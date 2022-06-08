/*
Simple class that handles with the creation
of cones.
*/

var cone;

class Cone {
    constructor ( x,y,z, radius, height, radSegs, color, xRot=0, yRot=0, zRot=0 ) {
        this.x = x; //storing these for now, might remove later on
        this.y = y;
        this.z = z;
        this.radius = radius;
        this.height = height;
        this.radSegs = radSegs;
        this.color = color;
        this.xRot = xRot;
        this.yRot = yRot;
        this.zRot = zRot;
        this.material = new THREE.MeshBasicMaterial ( { color: color, wireframe: false } );
        this.geometry = new THREE.ConeGeometry ( radius, height, radSegs );
        this.mesh = new THREE.Mesh ( this.geometry, this.material );
        
        cone = new THREE.Object3D ( );
        cone.position.set ( x, y, z );
        cone.rotation.set( xRot, yRot, zRot);
        cone.add ( this.mesh );

        this.obj3D = cone;
        this.boundaryRadius = Math.max(2*radius, height)/2;
        
    }
    //returns the created mesh
    getMesh() {
        return this.mesh;
    }
    //returns the Object3D instance
    getObj3D() {
        return this.obj3D;
    }
    //returns the object's color
    getColor() {
        return this.color;
    }
    //returns the object's boundary radius
    getBoundaryRadius(){
        return this.boundaryRadius; 
    }
    //set cone's position with spherical coordinates
    setPositionSpherical(theta, phi, radius) {
        this.obj3D.position.z = radius * Math.sin(phi) * Math.cos(theta);
        this.obj3D.position.x = radius * Math.sin(theta) * Math.sin(phi);
        this.obj3D.position.y = radius * Math.cos(phi);
    }
}
