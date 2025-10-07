import React from "react";

const FeaturedPropertiesSection: React.FC = () => {
  return (
    <div
      className="w-full dark:bg-background-dark font-display text-[#1C1917] dark:text-background-light relative z-10"
      style={{ backgroundColor: "#f8f7f6" }}
    >
      <section className="flex flex-col gap-8 px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
          Featured Properties
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group flex flex-col gap-4 overflow-hidden rounded-lg">
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCAXOyGf9vBT33EZ3yMA0Py0WUW7k4O2-B48rPx41dIvHu7k-ZKXy9EtzzwOAQu1lI5EYBaHiFE0VNzvxmQZ_enki9fICwyNDBRPH7wDm49gQQ5hPej7f_FpNs5mMdLoR8gjhvfGs0j344espDej-9gUwVVejx0JOdPOTdAdHh--jasnA_NSZRsi0bAFxvbILJg-2uKQMepUf2MyU_cgsc8GEx3RShCXvHRGINYUTfTQ7zmIn28G0E023mxH_UKuH3WDXmA9GTx3WsY")`,
                }}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">
                Exclusive Villa in Emirates Hills
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                5 Bedrooms | 6 Bathrooms | 8,000 sq ft
              </p>
            </div>
          </div>

          <div className="group flex flex-col gap-4 overflow-hidden rounded-lg">
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBNwxd2EqMSwM8Bw1fvBId_q2_wnBloBguPpIeyFBsYM4_vjrZtxVygiXmQNiBkgQgPKWRCl-ppjiylX3EcW8cpfYY2_hVQ_CLxEXTUlVlr9RsCJ0szfdv5dNMy0IuPBm4-nuvxtx5zT_Ipw_fYrdpOr3Vvip7gJFKa1KpsatinbqKDOn9rdfSCRX2ZUAs5sEWFiWqPU31aKXs8h4h6vkh40Pk9Bz2oRjcLu1T2D_ZYqEiD0ZpMn7gkPy2Nd8NVS7RZI5jVc2fQSb26")`,
                }}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">
                Contemporary Apartment in Downtown Dubai
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                2 Bedrooms | 3 Bathrooms | 1,500 sq ft
              </p>
            </div>
          </div>

          <div className="group flex flex-col gap-4 overflow-hidden rounded-lg">
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCZFzBcDFmc5u_5WUUtsF1uKoKsOYMKGECmGFGYxuTXDif12lD3gtPqANLI2bpqJ5Idlpd8VXqOPAeam9vgMMA8KuY2Jm_kJp1ZVXHo0RifZCajVElZTkLWOBWrNn242P_ouTlpqzBwpPn0wqC8vC1mNzP72YdKa5EHWgupXdVYQkEmZrtQVQ83VsCVj8yQqsEMtbzpqPFrXEx_xFkZcn5Jp7xNG0vYgkX2Q-Pxei-JqvBPZGsYOgNeYgEbP1Cqk1U9QA81ghw4D6zs")`,
                }}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">
                Luxury Penthouse in Dubai Marina
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                3 Bedrooms | 4 Bathrooms | 3,000 sq ft
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedPropertiesSection;
