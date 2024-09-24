import * as THREE from 'three';

export function ensureSameAttributes(geometries: THREE.BufferGeometry[]) {
    const attributes = ['position', 'normal', 'uv']; // Attributes that are needed
    geometries.forEach((geometry) => {
        attributes.forEach((attr) => {
            if (!geometry.getAttribute(attr)) {
                // If the geometry is missing an attribute, we add a placeholder
                const count = geometry.getAttribute('position').count; // Base count on the position attribute
                let data;
                if (attr === 'uv') {
                    data = new Float32Array(count * 2); // UV has 2 components (u, v)
                } else {
                    data = new Float32Array(count * 3); // Position/Normal have 3 components (x, y, z)
                }
                geometry.setAttribute(attr, new THREE.BufferAttribute(data, attr === 'uv' ? 2 : 3));
            }
        });
    });
    return geometries;
}
