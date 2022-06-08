/*
Simple class that handles with the creation
of spheres.
*/
class Sphere {
    constructor ( x,y,z, radius, widthSegs, heightSegs, color, xRot=0, yRot=0, zRot=0 ) {
        this.x = x; //storing these for now, might remove later on
        this.y = y;
        this.z = z;
        this.radius = radius;
        this.widthSegs = widthSegs;
        this.heightSegs = heightSegs;
        this.color = color;
        this.xRot = xRot;
        this.yRot = yRot;
        this.zRot = zRot;
        this.material = new THREE.MeshBasicMaterial ( { color: color, wireframe: false } );
        this.geometry = new THREE.SphereGeometry ( radius, widthSegs, heightSegs );
        this.mesh = new THREE.Mesh ( this.geometry, this.material );
        
        let sphere = new THREE.Object3D ( );
        sphere.position.set ( x, y, z );
        sphere.rotation.set( xRot, yRot, zRot);
        sphere.add ( this.mesh );

        this.obj3D = sphere;
        
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
    //set sphere's position with spherical coordinates
    setPositionSpherical(theta, phi, radius) {
        this.obj3D.position.z = radius * Math.sin(phi) * Math.cos(theta);
        this.obj3D.position.x = radius * Math.sin(theta) * Math.sin(phi);
        this.obj3D.position.y = radius * Math.cos(phi);
    }
}
