'use client';

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Helper object for WebGL Particle Logic (Strictly untouched)
const Helper = {
    createShader: (gl: WebGLRenderingContext, type: number, source: string) => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
    },
    createProgram: (gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) => {
        const program = gl.createProgram();
        if (!program) return null;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        return program;
    },
    pixel2DVertexVaryingShader: `
        attribute vec2 a_position;
        uniform vec2 u_resolution;
        attribute vec2 a_color;
        varying vec2 v_color;
        void main(){
            gl_Position = vec4( vec2( 1, -1 ) * ( ( a_position / u_resolution ) * 2.0 - 1.0 ), 0, 1 );
            v_color = a_color;
        }
    `,
    uniform2DFragmentVaryingShader: `
        precision mediump float;
        varying vec2 v_color;
        uniform float u_tick;
        float frac = 1.0/6.0;
        void main(){
            float hue = v_color.x + u_tick;
            hue = abs(hue - floor(hue));
            vec4 color = vec4( 0, 0, 0, 1 );
            if( hue < frac ){
                color.r = 1.0; color.g = hue / frac; color.b = 0.0;
            } else if( hue < frac * 2.0 ){
                color.r = 1.0 - ( hue - frac ) / frac; color.g = 1.0; color.b = 0.0;
            } else if( hue < frac * 3.0 ){
                color.r = 0.0; color.g = 1.0; color.b = ( hue - frac * 2.0 ) / frac;
            } else if( hue < frac * 4.0 ){
                color.r = 0.0; color.g = 1.0 - ( hue - frac * 3.0 ) / frac; color.b = 1.0;
            } else if( hue < frac * 5.0 ){
                color.r = ( hue - frac * 4.0 ) / frac; color.g = 0.0; color.b = 1.0;
            } else {
                color.r = 1.0; color.g = 0.0; color.b = 1.0 - ( hue - frac * 5.0 ) / frac;
            }
            color = vec4( color.rgb * v_color.y, 1.0 );
            gl_FragColor = color;
        }
    `
};

// ==========================================
// FEATURE DATA
// ==========================================
const featuresData = [
    {
        id: 1,
        text: "AI-powered learning & modern curriculum ecosystem",
    },
    {
        id: 2,
        text: "World-class infrastructure & smart digital classrooms",
    },
    {
        id: 3,
        text: "150+ affiliated skill labs & innovation studios across Bihar",
    },
    {
        id: 4,
        text: "Thousands of successful alumni placed across the globe",
    },
    {
        id: 5,
        text: "Start-up incubation & entrepreneurship support programs",
    },
    {
        id: 6,
        text: "Vibrant, safe, and secure residential campus environments",
    },
];

export default function ExperienceSection() {
    // --- Particle Canvas Logic Variables ---
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const webglRef = useRef<any>({});
    const particlesRef = useRef<any[]>([]);
    const tickRef = useRef(0);
    const dimensionsRef = useRef({ width: 0, height: 0, cx: 0, cy: 0 });
    const animationFrameIdRef = useRef<number | null>(null);

    const maxParticles = 400;
    const particleSizeMin = 1.5;
    const particleSizeMax = 3.5;
    const speedScale = 1.2;

    useEffect(() => {
        const canvas = canvasRef.current;
        const section = sectionRef.current;
        if (!canvas || !section) return;

        const gl = canvas.getContext('webgl', { alpha: true });
        if (!gl) return;

        const updateDimensions = () => {
            const rect = section.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            dimensionsRef.current = {
                width: rect.width,
                height: rect.height,
                cx: rect.width / 2,
                cy: rect.height / 2
            };
            gl.viewport(0, 0, rect.width, rect.height);
            if (webglRef.current.uniformLocs) {
                gl.uniform2f(webglRef.current.uniformLocs.resolution, rect.width, rect.height);
            }
        };

        const vShader = Helper.createShader(gl, gl.VERTEX_SHADER, Helper.pixel2DVertexVaryingShader);
        const fShader = Helper.createShader(gl, gl.FRAGMENT_SHADER, Helper.uniform2DFragmentVaryingShader);
        if (!vShader || !fShader) return;

        webglRef.current.shaderProgram = Helper.createProgram(gl, vShader, fShader);
        if (!webglRef.current.shaderProgram) return;

        webglRef.current.attribLocs = {
            position: gl.getAttribLocation(webglRef.current.shaderProgram, 'a_position'),
            color: gl.getAttribLocation(webglRef.current.shaderProgram, 'a_color')
        };
        webglRef.current.buffers = {
            position: gl.createBuffer(),
            color: gl.createBuffer()
        };
        webglRef.current.uniformLocs = {
            resolution: gl.getUniformLocation(webglRef.current.shaderProgram, 'u_resolution'),
            tick: gl.getUniformLocation(webglRef.current.shaderProgram, 'u_tick')
        };
        webglRef.current.data = { triangles: [], colors: [] };

        updateDimensions();

        gl.useProgram(webglRef.current.shaderProgram);
        gl.enableVertexAttribArray(webglRef.current.attribLocs.position);
        gl.enableVertexAttribArray(webglRef.current.attribLocs.color);
        gl.bindBuffer(gl.ARRAY_BUFFER, webglRef.current.buffers.position);
        gl.vertexAttribPointer(webglRef.current.attribLocs.position, 2, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, webglRef.current.buffers.color);
        gl.vertexAttribPointer(webglRef.current.attribLocs.color, 2, gl.FLOAT, false, 0, 0);
        gl.uniform2f(webglRef.current.uniformLocs.resolution, dimensionsRef.current.width, dimensionsRef.current.height);

        gl.clearColor(0, 0, 0, 0);

        webglRef.current.clear = () => {
            gl.clear(gl.COLOR_BUFFER_BIT);
            webglRef.current.data.triangles = [];
            webglRef.current.data.colors = [];
        };

        webglRef.current.draw = () => {
            gl.bindBuffer(gl.ARRAY_BUFFER, webglRef.current.buffers.position);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(webglRef.current.data.triangles), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, webglRef.current.buffers.color);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(webglRef.current.data.colors), gl.STATIC_DRAW);
            gl.drawArrays(gl.TRIANGLES, 0, webglRef.current.data.triangles.length / 2);
        };

        function getCircleTriangles(x: number, y: number, r: number) {
            const triangles = [];
            const inc = Math.PI * 2 / 6;
            let px = x + r;
            let py = y;
            for (let i = 0; i <= Math.PI * 2 + inc; i += inc) {
                const nx = x + r * Math.cos(i);
                const ny = y + r * Math.sin(i);
                triangles.push(x, y, px, py, nx, ny);
                px = nx;
                py = ny;
            }
            return triangles;
        }

        class Particle {
            size!: number; x!: number; y!: number; vx!: number; vy!: number; time!: number;
            constructor() { this.reset(); }
            reset() {
                this.size = particleSizeMin + (particleSizeMax - particleSizeMin) * Math.random();
                this.x = dimensionsRef.current.cx;
                this.y = dimensionsRef.current.cy;
                this.vx = (Math.random() - 0.5) * 2 * speedScale;
                this.vy = -2 - speedScale * Math.random();
                this.time = 1;
            }
            step() {
                this.x += (this.vx *= 0.995);
                this.y += (this.vy += 0.05);
                this.time *= 0.99;
                const triangles = getCircleTriangles(this.x, this.y, this.size * this.time);
                const hue = this.vy / 10;
                for (let i = 0; i < triangles.length; i += 2) {
                    webglRef.current.data.triangles.push(triangles[i], triangles[i + 1]);
                    webglRef.current.data.colors.push(hue, this.time);
                }
                if (this.y - this.size > dimensionsRef.current.height) {
                    this.reset();
                }
            }
        }

        const animate = () => {
            webglRef.current.clear();
            tickRef.current++;
            if (particlesRef.current.length < maxParticles) {
                particlesRef.current.push(new Particle(), new Particle());
            }
            particlesRef.current.sort((a, b) => a.time - b.time);
            particlesRef.current.forEach(particle => particle.step());
            gl.uniform1f(webglRef.current.uniformLocs.tick, tickRef.current / 100);
            webglRef.current.draw();
            animationFrameIdRef.current = requestAnimationFrame(animate);
        };

        animationFrameIdRef.current = requestAnimationFrame(animate);

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            dimensionsRef.current.cx = e.clientX - rect.left;
            dimensionsRef.current.cy = e.clientY - rect.top;
        };

        window.addEventListener('resize', updateDimensions);
        window.addEventListener('mousemove', handleMouseMove);

        setTimeout(updateDimensions, 100);

        return () => {
            if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
            window.removeEventListener('resize', updateDimensions);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section ref={sectionRef} className="bg-[#fdfcfb] relative w-full border-t border-gray-100 py-10 md:py-12">

            {/* INTEGRATED BACKGROUND PARTICLES */}
            <div className="absolute inset-0 z-[1] opacity-70 pointer-events-none">
                <canvas ref={canvasRef} className="w-full h-full block" />
            </div>

            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-white/40 z-[2] pointer-events-none"></div>

            <div className="container-custom relative z-10">

                {/* Section Header */}
                <div className="flex flex-col items-center mb-8 w-full text-center">
                    <h2 className="heading-xl max-w-4xl">
                        Experience the Future of Education at <span className="text-[#004d80]">BPTPIA</span>
                    </h2>
                    <p className="text-muted mt-1 text-sm md:text-base">
                        Where innovation meets ambition, and learners become leaders in the technical sector.
                    </p>
                    <div className="w-20 h-1 bg-[#fbc02d] mt-4 rounded-full mx-auto"></div>
                </div>

                {/* Main Grid Layout (Left: Features, Right: Video) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

                    {/* ========================================= */}
                    {/* LEFT SIDE: 6 NUMBERED FEATURE CARDS       */}
                    {/* ========================================= */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        {featuresData.map((feature, index) => (
                            <motion.div
                                key={feature.id}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-[#fbc02d]/50 transition-all duration-300 flex flex-col"
                            >
                                {/* Yellow Number Badge */}
                                <div className="w-6 h-6 bg-[#fbc02d] text-black font-bold text-xs flex items-center justify-center rounded mb-2 shadow-sm">
                                    {feature.id}
                                </div>
                                {/* Feature Text */}
                                <p className="text-[#050505] font-medium text-sm leading-snug">
                                    {feature.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* ========================================= */}
                    {/* RIGHT SIDE: AUTO-PLAYING VIDEO            */}
                    {/* ========================================= */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-5 relative w-full h-[250px] sm:h-[300px] lg:h-[350px] rounded-xl overflow-hidden shadow-lg bg-black border-2 border-white"
                    >
                        {/* HTML5 Video Player */}
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                            src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4"
                        />

                        {/* Optional Overlay/Play Button styling for visual effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-white text-xs md:text-sm font-medium drop-shadow-md">
                                Transforming education through hands-on practical learning.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}