# Building a Docker Image

## Overview

A Docker image is built using a `Dockerfile`, which defines the steps required to package an application.



---
## Example Dockerfile

```dockerfile
# Use base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY package.json .
COPY . .

# Install dependencies
RUN npm install

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```


---
## Build the Image
docker build -t my-app:1.0 .



---
## Run the Container
docker run -p 3000:3000 my-app:1.0



---
## How the Build Works

Docker builds images in layers:

- Base image is pulled
- Each instruction creates a new layer
- Layers are cached for efficiency



---
## Image Layering Concept

<div class="mermaid">
graph TD
    BaseImage --> Layer1
    Layer1 --> Layer2
    Layer2 --> FinalImage
</div>



---
## Best Practices

- Use small base images (e.g. alpine)
- Minimise number of layers
- Use .dockerignore
- Avoid running as root
- Pin dependency versions




---
## Common Mistakes

- Copying unnecessary files into image
- Not using caching effectively
- Large image sizes




---
## Real-World Implications

- Smaller images = faster deployments
- Efficient builds reduce CI/CD time
- Clean images reduce security risks




---
## Key Takeaways

- Dockerfiles define how images are built
- Images are layered and cached
- Good practices improve performance and security


---