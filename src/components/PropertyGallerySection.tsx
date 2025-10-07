import React from "react";

const PropertyGallerySection: React.FC = () => {
  return (
    <div
      className="w-full dark:bg-background-dark font-display text-[#1C1917] dark:text-background-light relative z-10"
      style={{ backgroundColor: "#f8f7f6" }}
    >
      <section className="flex flex-col gap-8 px-4 sm:px-6 lg:px-8 py-8 h-screen">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
          Property Gallery
        </h2>
        <div className="grid h-full w-full grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-xl">
          <div
            className="col-span-2 row-span-2 h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAoIifuX_nCeZTyguKV3O5m4x5PmTb-rtx94bEuxBFiz5QuqvBDEmWo3HtIGtSfJ1rvJS2rerNDRQHfziyhyE1nGdaFiWZBTt8-hMAPubX9t9bUNAv-833y0pTq_q1z_L0nf2AqhlLB2i8sgRZe6PfIkOuN0GwwqC60H5Q_ZyDJzTO6nXCO0_LjaYjKHtGH-N80o_-LBW6zIePTGIVMDzHmivi4dGHubE17dkGDIOKlOB7_fiZbB2xrFUEt3qRyv01FCEvgarTDk6Gc")`,
            }}
          />
          <div
            className="col-span-2 h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuC6J_c4tt1bCFujL_IPTOgpYdCDkJqDcKjNQr39p2Gt4TCzM0mCaHciDCCZMsYG7NDbT5OUoAETZmRVdt3jb_dGwZnVavcoWcI68npcL585yi5EJvLel9prwek_w0q0NugXD9o85CcB8qxVq8fwDi9QvMA8Im1M8rB5iv4MqSVUY-10eNfibHV3hCMs-5QzPbTO531zf7h2Olwk18Uauysgsa_S0-Kw_UctmbEM5m4NTcawDt9c2NLoYm8t42JS9vgihT9rpaKn1ztO")`,
            }}
          />
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCZFzBcDFmc5u_5WUUtsF1uKoKsOYMKGECmGFGYxuTXDif12lD3gtPqANLI2bpqJ5Idlpd8VXqOPAeam9vgMMA8KuY2Jm_kJp1ZVXHo0RifZCajVElZTkLWOBWrNn242P_ouTlpqzBwpPn0wqC8vC1mNzP72YdKa5EHWgupXdVYQkEmZrtQVQ83VsCVj8yQqsEMtbzpqPFrXEx_xFkZcn5Jp7xNG0vYgkX2Q-Pxei-JqvBPZGsYOgNeYgEbP1Cqk1U9QA81ghw4D6zs")`,
            }}
          />
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuD0WrSiqXisHQCicrGuEaTp2oSD028b--M3ElBWR0nowfiJBOzi7S7C66C-SqOJZohLCKY-SIrDpQ1XebDVwvdpDSubUt1M36m7jk6C5joIREPHXO4l2mjh-RXRkAW7unqGzNsW7kPMPo4zgyUZRd0WNIzo1_t18oJMPOJhzrMfRCTlw1uA8cfRTkGT9yQ8gCgO0PiM1cNODHc_xXNlcvcapOG7KPGuBrzKBxTPefrgbA0-SOSbnilwThpQHvNCri5nSsI4djKa0mtE")`,
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default PropertyGallerySection;
