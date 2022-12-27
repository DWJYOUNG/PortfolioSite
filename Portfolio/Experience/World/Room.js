import * as THREE from "three";
import GSAP from "gsap";

import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

import Experience from "../Experience";


export default class Room {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        this.lerp = {
            current: 0,
            target:0,
            ease: 0.1
        }

        this.setModel();
        this.onMouseMove();
    }

    setModel() {
        this.actualRoom.children.forEach((child) =>{
            child.castShadow = true;
            child.receiveShadow = true;
            if(child instanceof THREE.Group){
                child.children.forEach((groupChild) => {
                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;
                })

            }

            if(child.name === "Screen1"){ 
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screenOne,
                });
                //console.log(child);
            }

        });

        const moonLightWidth = 1;
        const moonLightHeight = 1;
        const moonLightIntensity = 5;
        const moonLight = new THREE.RectAreaLight(
            0xfbfc9a,
            moonLightIntensity,
            moonLightWidth,
            moonLightHeight
        );
        moonLight.position.set(-0.348351,0.9,-1.5);
        moonLight.rotateY(Math.PI/6);
        moonLight.rotateX((7*Math.PI/6));
        this.actualRoom.add(moonLight);

        // const moonLightHelper = new RectAreaLightHelper(moonLight);
        // moonLight.add(moonLightHelper);

        const tableLightWidth = 0.7;
        const tableLightHeight = 0.3;
        const tableLightIntensity = 7;
        const tableRectLight = new THREE.RectAreaLight(
            0x0743f5,
            tableLightIntensity,
            tableLightWidth,
            tableLightHeight
        );
        tableRectLight.position.set(-0.590623,0.475421,-0.108069);
        tableRectLight.rotateY(Math.PI/4);
        tableRectLight.rotateX(-Math.PI/2);

        this.actualRoom.add(tableRectLight);

        // const tableRectLightHelper = new RectAreaLightHelper(tableRectLight);
        // rectLight.add(tableRectLightHelper);

        const roomLightWidth = 1.2;
        const roomLightHeight = 1.2;
        const roomLightIntensity = 5;
        const roomLight = new THREE.RectAreaLight(
            0x0743f5,
            roomLightIntensity, 
            roomLightWidth, 
            roomLightHeight
        );
        roomLight.position.set(0,1.723,0);
        roomLight.rotateY(Math.PI/4);
        roomLight.rotateX(-Math.PI/2);
        this.actualRoom.add(roomLight);

        const roomLightHelper = new RectAreaLightHelper(roomLight);
        roomLight.add(roomLightHelper);


        this.scene.add(this.actualRoom);
    }

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation = ((e.clientX - window.innerWidth / 2)) * 2/window.innerWidth;  
            this.lerp.target = this.rotation * 0.1;
        });
    }

    resize(){} 
    

    update(){
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;
    }
}