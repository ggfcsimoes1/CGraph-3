class Origami {
    constructor ( x,y,z, vertices, color, texture = null) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.mat = false;
        this.vertices = vertices;

        this.materialPhong = new THREE.MeshPhongMaterial({ color: color, side: THREE.DoubleSide, map: texture });
        this.materialLambert = new THREE.MeshLambertMaterial({ color: color, side: THREE.DoubleSide, map: texture }); 

        this.geometry = new THREE.BufferGeometry();
    
        this.geometry.setAttribute( 'position', new THREE.BufferAttribute( this.vertices, 3 ) );
        this.geometry.computeVertexNormals();

        this.mesh = new THREE.Mesh( this.geometry, this.materialPhong );
        this.mesh.position.set(this.x, this.y, this.z);

    }
    //returns the created mesh
    getMesh() {
        return this.mesh;
    }

    alternateMaterial(){
        if (this.mat) {
            this.mesh.material = this.materialPhong;
            this.mat = false;
        } else {
            this.mesh.material = this.materialLambert;
            this.mat = true;
        }
    }
}