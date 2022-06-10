
var plane;

class Plane {
    constructor ( x,y,z, width, height, color) {
        this.x = x; 
        this.y = y;
        this.z = z;
        this.width = width;
        this.height = height;
        this.color = color;
        this.geo = new THREE.PlaneBufferGeometry(this.width, this.height, 8, 8);
        this.mat = new THREE.MeshBasicMaterial({ color: this.color, side: THREE.DoubleSide });
        this.plane = new THREE.Mesh(this.geo, this.mat);

        this.plane.rotateX( - Math.PI / 2);
        
        this.plane.position.set ( x, y, z );
        
    }
    //returns the created mesh
    getMesh() {
        return this.plane;
    }
    //returns the object's color
    getColor() {
        return this.color;
    }
    //set box's position with spherical coordinates
    setPositionSpherical(theta, phi, radius) {
        this.obj3D.position.z = radius * Math.sin(phi) * Math.cos(theta);
        this.obj3D.position.x = radius * Math.sin(theta) * Math.sin(phi);
        this.obj3D.position.y = radius * Math.cos(phi);
    }
}
