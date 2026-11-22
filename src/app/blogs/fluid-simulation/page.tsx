import Link from "next/link";
import styles from "../BlogPost.module.scss";
import CodeBlock from "@/components/CodeBlock/CodeBlock";
import Latex from "@/components/Latex/Latex";
import { blog } from "./blog";
import { eighth, eleventh, fifth, first, fourth, ninth, second, seventh, sixth, tenth, third, thirteenth, twelfth } from "./code_blocks/blocks";

export const metadata = {
  title: `${blog.title} | The Shulker Box`,
  description: blog.description,
};

export default function FluidSimulation() {
  return (
    <main className={styles.page}>
      <Link className={styles.back} href="/blogs">
        ← Back to The Shulker Box
      </Link>
      <article>
        <header className={styles.header}>
          <div className={styles.meta}>
            <time dateTime={blog.date}>{blog.date}</time>
            <span aria-hidden="true">·</span>
            <span>{blog.readingTime}</span>
            <span aria-hidden="true">·</span>
            <span>{blog.category}</span>
          </div>
          <h1 className={styles.title}>{blog.title}</h1>
          <p className={styles.description}>{blog.description}</p>
        </header>

        <div className={styles.content}>
            <p>
                It is very fascinating to see how physical pheonomenon in our world take place.
                Fluid simulation is something I came across in <a href="https://www.youtube.com/watch?v=alhpH6ECFvQ" target="_blank">Coding Channel 132</a>,
                the video was really fun, but I ended up implementing in a slighly different way as to what was in the video.
            </p>

            <p>
                This article is largely based of this video by Gonkee: <a href="https://www.youtube.com/watch?v=qsYE1wMEMPA" target="_blank">
But How DO Fluid Simulations Work?</a>
            </p>

            <h1>The end product and source code</h1>
            <p>Drag ur mouse (or drag across the screen with ur finger if on mobile) around the canvas to see the fluid simulation</p>
            <iframe src="https://editor.p5js.org/Ayaan-Surkhi/full/ZPcwwrNK2"></iframe>

            <p>
                The files to the simulation can be found at: <br></br>
                <a href="https://github.com/Ayaan-Surkhi/fluid_simulation" target="_blank"> fluid simulation repo </a>
                or 
                <a href="https://editor.p5js.org/Ayaan-Surkhi/sketches/ZPcwwrNK2" target="_blank"> the p5 sketch </a>
            </p>

            <h1>
                Structure and Tech
            </h1>

            <p>I&apos;ll be using the <a href="https://p5js.org/" target="_blank">p5.js</a> library which is a creative coding library in javascript </p>

            <p>I&apos;ll have two separate files <code className={styles.code_box}>sketch.js</code> and <code className={styles.code_box}>fluid.js</code> </p>
            <p><code className={styles.code_box}>sketch.js</code> will contain the setup and draw functions from p5</p>
            <p><code className={styles.code_box}>fluid.js</code> contains the Cell class, a cell is a representative of a particular block of a fluid (what this means will be explained shortly)</p>
       
            <h1>The physics</h1>
            <h2>Constraints</h2>
            <p>We will be working with imcompressible fluids, which means that the density of the fluid remains constant over time. This is a common assumption in fluid dynamics and simplifies the equations we need to solve.</p>

            <h2>Navier Stokes Equations</h2>

            <div aria-label="Divergence of velocity">
              <Latex expression={String.raw`\nabla \cdot \mathbf{u} = 0`} displayMode />
            </div>

            <div aria-label="Navier-Stokes equation">
              <Latex
                expression={String.raw`\rho\left(\frac{\partial \mathbf{u}}{\partial t}+\mathbf{u}\cdot\nabla\mathbf{u}\right)=-\nabla p+\mu\nabla^2\mathbf{u}+\mathbf{f}`}
                displayMode
              />
            </div>

            <p> 
                This might look complicated at first glance but what they really mean is that:
            </p>

            <p>first equation: The velocity in neighbouring areas of a fluid cannot flow towards each other, or away from each other, otherwise 
                it would mean that somewhere in the middle matter would either have to be created out of nothing or disappear into nothing essentially the equation makes sure that mass is conserved in the fluid
            </p>

            <p>Second equation: It states that the acceleration of a fluid is dependent on its internal forces, including its pressure gradient(1st term) and viscosity (2nd term) and also on external forces on fluid (3rd term)  </p>
            
            <p>
                What we need to know here is that pressure moves from high pressure to low pressure, and viscosity is a measure of how much a fluid resists flow. The higher the viscosity, the more resistant the fluid is to flow.
                In our example we ignore the viscosity term and the external forces term, so we are left with the pressure gradient term
            </p>

            <h1>How to implement</h1>
            <p>These equations lay some rules down for the simulation but are not enough for us to implement fluid simulation</p>
            <p>The paper <a href="https://graphics.cs.cmu.edu/nsp/course/15-464/Fall09/papers/StamFluidforGames.pdf" target="_blank">Real-Time Fluid Dynamics for Games</a> by Jos Stam which was referenced in Gonkee&apos;s video gives us a way to implement in a way that is computationally efficient</p>
        
            <p>There are 3 key things we need to implement</p>
            <ul>
                <li>Diffusion</li>
                <li>Advection</li>
                <li>Projection (clearing divergence)</li>
            </ul>

            <p>What these terms mean and do will be discussed after going over the cell class</p>

            <p>
                We would have a grid of cells, each cell would represent a block of fluid, and each cell would have a velocity and a density. The velocity would be a vector that represents the direction and speed of the fluid in that cell, and the density would represent how much fluid is in that cell.
            </p>

            <h1>Cell class</h1>
            <CodeBlock code={first} language="javascript" filename="fluid.js" />
       
            <p>
                A particular cell is represented by its position in the grid (i, j), its density (d), its velocity (vx, vy), and its pressure (p). The dt parameter is the time step for the simulation, which determines how much time passes between each update of the simulation.
            </p>

            <CodeBlock code={second} language="javascript" filename="fluid.js" />
            <p>
                We define n as the number of cells in the grid, cellSize as the size of each cell, and cells and nextCells as arrays that will hold the current and next state of the cells in the simulation.
            </p>

            <CodeBlock code={third} language="javascript" filename="sketch.js" />
            <p>
                Inside setup we create our canvas and initialize the cells in the grid. We create a blob of density near the center of the grid and give it a gentle velocity. 
                The density is calculated using a Gaussian function (to get values pretaining to a normal distribution), which creates a smooth distribution of density around the center of the grid. 
            </p>
            
            <p>The velocity is set to be perpendicular to the position vector, which creates a circular flow around the center of the grid.</p>
       
            <CodeBlock code={fourth} language="javascript" filename="sketch.js" />
            <p>
                We define a function swapGrids that swaps the current and next state of the cells in the simulation. This is done to update the state of the simulation for the next frame.
                We keep track of current and next state, as we would need the current state when trying to compute new densities in advection and diffusion
            </p>

            <h1>Diffusion</h1>
            <p>Diffusion is where the properties of one part of the fluid spread on to the surrounding area, our goal is to make the properties of a particular cell equal to the average of the densities of the 4 surrounding cells</p>
            <CodeBlock code={fifth} language="javascript" filename="fluid.js" />
            
            <div aria-label="Diffusion equation">
              <Latex
                expression={String.raw`d_n = \frac{d_c + k \cdot s_n}{1+k}`}
                displayMode
              />
            </div>
            <p> s here is the average of the 4 surrounding cells, and k is the change factor</p>

            <CodeBlock code={sixth} language="javascript" filename="sketch.js" />

            <p>
                each cell inside the grid (except for the cells on the edges) will have its density updated based on the average of the densities of the 4 surrounding cells. The new density is then stored in the nextCells array, which will be used to update the state of the simulation for the next frame.
            </p>

            <h1>Advection</h1>
            <p>Advection is the movement of attributes through the fluid following its velocity</p>
            <p>The velocity of a particular cell will affect properties of the neighbourhood of cells to which it points</p>

            <CodeBlock code={seventh} language="javascript" filename="fluid.js" />
            <CodeBlock code={eighth} language="javascript" filename="fluid.js" />
            <CodeBlock code={ninth} language="javascript" filename="sketch.js" />

            <p>
                What happens here is that in the first code block we find the cell which caused the current density to be the way it is, i.e we backtrack to find the cell or grid position that caused the current cell we are on to have the density it has.
            </p>


            <p>
                We then linearly interpolate around the four surrounding cells of the backtracked position to find the new density of the current cell we are on, and store it in the nextCells array  
            </p>

            <p>
                What interpolate really means is that we find the average of the four surrounding cells of the backtracked position, but we give more weight to the cells that are closer to the backtracked position, and less weight to the cells that are further away. This is done using the linear interpolation formula defined above.
            </p>

            <h1>Projection</h1>
            <p>
                Our goal here is to make sure that the divergence of the velocity is 0, which means that the fluid is incompressible. 
                After advection and diffusion, we end up with velocity field that has both curl and divergence, but we want a velocity field that has curl but no divergence.
            </p>

            <p>
                We use the Helmholtz&apos;s theorem to decompose the velocity field into a divergence-free component and a curl-free component. We then subtract the curl-free component from the original velocity field to obtain a divergence-free velocity field.
            </p>

            <p>
                To do this we first need divegence at each position.
            </p>
            
            <p>Divergence at each position is given by the formula:</p>  
            
            <Latex
                expression={String.raw`\nabla \cdot \mathbf{v}(x, y) = \frac{v_x(x, y) - v_x(x-1, y) + v_y(x, y) - v_y(x, y-1)}{2}`}
            />

            <p>
                <br></br>
                This calculates the difference in x velocities between two horizontal squares and difference betweeen y velocities of two vertical squares sums them up and then divides by 2
            </p>

            <p> 
                Next step uses a system of simultaneous equations to find the pressure at each position, which is given by the formula:
            </p>

            <Latex
                expression={String.raw`p(x, y) = \frac{p(x-1, y) + p(x+1, y) + p(x, y-1) + p(x, y+1) - \nabla \cdot \mathbf{v}(x, y)}{4}`} />

            <p>
                <br></br>
                We now have a field of p values, which is a scalar field, and we find gradient vector field of this field
                The curl of such a gradient vector field is always 0 according to calculus, and we subtract this gradient vector field from the original velocity field to get a divergence free velocity field
                <br></br>
            </p>

            <Latex
                expression={String.raw`\nabla p(x, y) = \left(\frac{p(x+1, y) - p(x-1, y)}{2}, \frac{p(x, y+1) - p(x, y-1)}{2}\right)`} />

            <CodeBlock code={tenth} language="javascript" filename="fluid.js" />
            <CodeBlock code={eleventh} language="javascript" filename="sketch.js" />
        
            <h1>Rendering</h1>
            <p>
                We check for a mouse drag event, and if it is true we add density to the cell that the mouse is currently on, and also add velocity to the cell that the mouse is currently on, in the direction of the mouse movement.
            </p>

            <p>
                Velocity is calculated by taking the difference between the current mouse position and the previous mouse position, and multiplying it by a small factor.
            </p>

            <CodeBlock code={twelfth} language="javascript" filename="sketch.js" />
        
            <p> 
                And finally we draw a semi transparent square at each cell, with the opacity of the square being proportional to the density of the cell. This creates a visual representation of the fluid simulation, where areas of high density appear more opaque and areas of low density appear more transparent.
            </p>

            <CodeBlock code={thirteenth} language="javascript" filename="sketch.js" />

            <h1>
                Final thoughts
            </h1>

            <p>
                This was a really fun project to work on, and I learned a lot about fluid dynamics and how to implement it in code. Some variations I'd like to try in the future are adding viscosity and external forces to the simulation, and also trying to implement a 3D version of the simulation.
            </p>

            <p>
                I hope this was helpful for anyone trying to implement fluid simulation, if there are any suggestions or improvements to be made to the article, <Link href='/contact'> let me know! </Link>
            </p>

            <h1>
                References
            </h1>

            <p>
                <a href="https://www.youtube.com/watch?v=qsYE1wMEMPA" target="_blank">
                    But How DO Fluid Simulations Work?
                </a>

                <br></br>
                <a href="https://www.youtube.com/watch?v=alhpH6ECFvQ" target="_blank">
                    Coding Challenge 132: Fluid Simulation
                </a>
                <br></br>
                <a href="https://graphics.cs.cmu.edu/nsp/course/15-464/Fall09/papers/StamFluidforGames.pdf" target="_blank">
                    Real-Time Fluid Dynamics for Games
                </a>
                <br></br>
                <a href="https://mikeash.com/pyblog/fluid-simulation-for-dummies.html" target="_blank">
                    Fluid Simulation for Dummies
                </a>

            </p>
        </div>


        <div className={styles.tags} aria-label="Tags">
          {blog.tags.map((tag) => <span className={styles.tag} key={tag}>#{tag}</span>)}
        </div>
      </article>
    </main>
  );
}
