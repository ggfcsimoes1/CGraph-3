var SessionHandler;

class VRSessionHandler {
	constructor(renderer, camera) {
		if (deviceType == "XR")
        	document.body.appendChild(VRButton.createButton(renderer));
		else if(deviceType == "POINTER")
			this.setupPointerStartButton(camera);
    }

    setupPointerStartButton(camera) {
        this.div = document.createElement('div');
        this.button = document.createElement('button');
        this.button.innerText = "VISTA VR";
        this.stylizeElements();
        this.div.appendChild(this.button);
        document.body.appendChild(this.div);

        this.controls = new THREE.PointerLockControls(camera, document.body);
        this.button.addEventListener('click', () => { this.controls.lock(); });
		this.controls.addEventListener('lock', () => {
            this.div.style.display = "none";
        });
        this.controls.addEventListener('unlock', () => {
            this.div.style.display = "block";
        });
    }

    stylizeElements() {
        this.div.style.position = 'absolute';
        this.div.style.bottom = '20px';
        this.div.style.width = '100%';
        this.div.style.textAlign = 'center';
        this.button.style.padding = '12px';
        this.button.style.border = '1px solid #fff';
        this.button.style.borderRadius = '4px';
        this.button.style.background = 'rgba(0,0,0,0.1)';
        this.button.style.color = '#fff';
        this.button.style.font = 'normal 13px sans-serif';
        this.button.style.opacity = '0.5';
        this.button.style.outline = 'none';
        this.button.onmouseenter = () => { this.button.style.opacity = '1.0'; };
        this.button.onmouseleave = () => { this.button.style.opacity = '0.5'; };
    }
}
