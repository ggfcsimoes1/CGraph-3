class Spotlight {
    constructor ( x,y,z, height, radius, material, bulbMaterial) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.height = height;
        this.material = material;
        this.bulbMaterial = bulbMaterial;

        this.group = new THREE.Group ( );

        let bulb = new Sphere(0,-(height/2.1),0,radius/3,10,10,bulbMaterial);

        this.group.add(bulb.getObj3D());

        let casing = new Cone(0, 0, 0, radius, height, 10, material);

        this.group.add(casing.getObj3D());
        this.group.position.set(x, y, z);
        
    }
    //returns the group created in the constructor
    getGroup() {
        return this.group;
    }
    toggleEmissive(on){
        if(on){
            this.bulbMaterial.emissive.setHex(0xffffff);
        } else {
            this.bulbMaterial.emissive.setHex(0x000000);
        }
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
