/*
Simple class that handles the creation
of spheres.
*/
class Sphere {
    constructor ( x,y,z, radius, widthSegs, heightSegs, material, xRot=0, yRot=0, zRot=0 ) {
        this.x = x; //storing these for now, might remove later on
        this.y = y;
        this.z = z;
        this.radius = radius;
        this.widthSegs = widthSegs;
        this.heightSegs = heightSegs;
        this.xRot = xRot;
        this.yRot = yRot;
        this.zRot = zRot;
        this.material = material;
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
}
