import React from "react";

const ExploreAreasSection: React.FC = () => {
  return (
    <div
      className="w-full dark:bg-background-dark font-display text-[#1C1917] dark:text-background-light relative z-10"
      style={{ backgroundColor: "#f8f7f6" }}
    >
      <section className="flex flex-col gap-8 px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
          Explore Dubai&apos;s Top Areas
        </h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:gap-8">
          <div className="group relative flex flex-col gap-3">
            <div className="aspect-square w-full overflow-hidden rounded-lg">
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuD-YgXss3jBIcJd4lYYNE3XpAK7haQhWdxY1dlrq20jNUMBwsRs8ckY4t4kXh40uffQlUyNsOkbIpKub-7uV8Kv4_Q_nW48FWYplkeTqni7Zfid4f-c1Mkk2IWFNVOxEufztdX7es-AfOn_r84WXvR2RFeGbp5Y9WSLPYDfF3K302aOooydWXSeqZpksqcWJHG8_7gXIVHWVde4F3pcBOpcKhbInPt382q7IFNXfhXOc-ms-jsRphmMNSa4yrbUBFSZhPrU0AKECn0-")`,
                }}
              />
            </div>
            <div>
              <h3 className="text-base font-semibold text-zinc-900">
                Downtown Dubai
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Iconic skyscrapers and vibrant city life.
              </p>
            </div>
          </div>

          <div className="group relative flex flex-col gap-3">
            <div className="aspect-square w-full overflow-hidden rounded-lg">
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBqlseACjjX6wRdhj1VUo7s_aCSP10PtiHtqUDXtKUWs8GQ8ACLs1xtsQLFIgZpTRyamL7AgK5hOAZZ3MNiJLgV4XXFg0-xH8lGZYzBbYzzTcykQLDs6fr7XbKLxuCbRk6Xw0nDYEF-XmO01kFnlo7DMzUCNRSY6Zgk_jWNYDndDkaB5AU1ZY7iwSMlT7nARW_xzq5kmfn11jdKMbW9rj4J6zn7ejL2HLrLBC979KfMhkrQ7GgSTz903oJlVYpDR_nvmaiO70wTDe-i")`,
                }}
              />
            </div>
            <div>
              <h3 className="text-base font-semibold text-zinc-900">
                Dubai Marina
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Waterfront living with stunning views.
              </p>
            </div>
          </div>

          <div className="group relative flex flex-col gap-3">
            <div className="aspect-square w-full overflow-hidden rounded-lg">
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCxubgtKE5VzlmYHz4Yq4p_FTOsmwpEVjESwWFBSBjLxdBiMJ3WxbZZZxE6f-7aGBMsP4tySoydAh8MporVTKLcePGbWPtV00HRa4vb1ik3nVwFSmJS_Vd7_rV-zAT-W4KV9IuiQffmeADdJ_BtBTJKkxy8hLKXBGgQEF4djv8w-CglcaUHN6mBEjjcQjf27O_rXcY7Bx-sWvZEwQYFIJui5mRtqBdotnFA4Wzrt3HmHFKH8Gt13t3yQn9pqFLNuNfMXHbiNtAsYNkV")`,
                }}
              />
            </div>
            <div>
              <h3 className="text-base font-semibold text-zinc-900">
                Palm Jumeirah
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Exclusive villas and resorts.
              </p>
            </div>
          </div>

          <div className="group relative flex flex-col gap-3">
            <div className="aspect-square w-full overflow-hidden rounded-lg">
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBI5cJ1Pz7iQVeelnMnJ9JFBgZa2wbyTSyHsDnxi1rAmk5YtX6sEBrBIWFKFdAsK8lPYqZm_75_DWXktu3o_5bgT3xso72fEGaS-F-iqyjpO8q5Q5_b-SZ4syHJEbKGJa1-bHV3cMwuvWqsJqcgWK06qRgutY7xPL7IZWSy6qA3F2hYE95a6fu4O-wnfmTa9RRH0gCCjAT4HkobzHvZpwdLtWV75Cl8xuOEzjGTlf_dPJ-u4M5gYeGiawHHF4AXCOI7vMHvKiVz-n_v")`,
                }}
              />
            </div>
            <div>
              <h3 className="text-base font-semibold text-zinc-900">
                Jumeirah Beach Residence
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Beachfront apartments and leisure.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExploreAreasSection;
