class Origami {
    constructor ( x,y,z, vertices, color, texture = null, uv=null) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.uv = uv;
        this.mat = false;
        this.vertices = vertices;

        this.frontMaterialPhong = new THREE.MeshPhongMaterial( { map: texture, side: THREE.FrontSide } );
        this.frontMaterialLambert = new THREE.MeshLambertMaterial({ map: texture, side: THREE.DoubleSide});

        this.backMaterialPhong = new THREE.MeshPhongMaterial( { color: color, side: THREE.BackSide } );
        this.backMaterialLambert = new THREE.MeshPhongMaterial( { color: color, side: THREE.BackSide } );

        this.geometry = new THREE.BufferGeometry();
    
        this.geometry.setAttribute( 'position', new THREE.BufferAttribute( this.vertices, 3 ) );
        this.geometry.setAttribute( 'uv', new THREE.BufferAttribute( this.uv, 2 ) );
        this.geometry.computeVertexNormals();

        this.group = new THREE.Group();
        this.frontMesh = new THREE.Mesh( this.geometry, this.frontMaterialPhong);
        this.backMesh = new THREE.Mesh( this.geometry, this.backMaterialPhong );

        this.group.add( this.frontMesh );
        this.group.add( this.backMesh );

        this.group.position.set(this.x, this.y, this.z);
    }
    //returns the created mesh
    getGroup() {
        return this.group;
    }

    alternateMaterial(){
        if (this.mat) {
            this.frontMesh.material = this.frontMaterialPhong;
            this.backMesh.material = this.backMaterialPhong;
            this.mat = false;
        } else {
            this.frontMesh.material = this.frontMaterialLambert;
            this.backMesh.material = this.backMaterialLambert;
            this.mat = true;
        }
    }
}