
### Inference frameworks
| Feature                     | Hugging Face ( Sagemaker )           | Deep Java Library ( Sagemaker )            | Direct EC2 + vLLM             | EKS + vLLM                    |
|-----------------------------|--------------------------------------|--------------------------------------------|-------------------------------|-------------------------------|
| **Performance Metrics** | Low | Latency, throughput; Sagemaker monitoring. | Best | - |
| **Cost Efficiency** | Higher cost | Higher cost | lowest cost    | Kube-native scaling  |
| **Latest Feature: like Multi-LoRA Support** | Depends on Sagemaker TGI version. | Depends on DJL/underlying lib. | Available with latest vLLM.    | Available with latest vLLM.   |
| **Managing CI/CD** | Native aws integration | Native aws integration| Manual CI/CD, direct control | EKS CI/CD tools. |

-----
### Training methods
| Feature        | Unsloth (as of April 28, 2025) | DeepSpeed (as of April 28, 2025) |
|----------------|---------------------------------|-----------------------------------|
| **Primary Goal** | Single-GPU speed and memory efficiency | Multi-GPU/node scalability for large models |
| **Ease of Use** | Simpler for single-GPU scenarios | Relatively easy API, but more complex config |
