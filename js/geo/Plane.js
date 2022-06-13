
var plane;

class Plane {
    constructor ( x,y,z, width, height, material) {
        this.x = x; 
        this.y = y;
        this.z = z;
        this.width = width;
        this.height = height;
        this.geo = new THREE.PlaneBufferGeometry(this.width, this.height, 8, 8);
        this.mat = material;
        this.plane = new THREE.Mesh(this.geo, this.mat);

        this.plane.rotateX( - Math.PI / 2);
        
        this.plane.position.set ( x, y, z );
        
    }
    //returns the created mesh
    getMesh() {
        return this.plane;
    }
    //set box's position with spherical coordinates
    setPositionSpherical(theta, phi, radius) {
        this.obj3D.position.z = radius * Math.sin(phi) * Math.cos(theta);
        this.obj3D.position.x = radius * Math.sin(theta) * Math.sin(phi);
        this.obj3D.position.y = radius * Math.cos(phi);
    }

    /* alternateMaterial(){
        if (this.mat) {
            this.mesh.material = this.materialPhong;
            this.mat = false;
        } else {
            this.mesh.material = this.materialLambert;
            this.mat = true;
        }
    } */
}
