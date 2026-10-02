import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AtmosphericBackground } from "@/components/ui/AtmosphericBackground";
import { CTAPrimary } from "@/components/ui/CTAPrimary";
import { seo } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getLandingPage(slug: string) {
  const query = `*[_type == "landingPage" && slug.current == $slug][0] {
    title,
    heroHeading,
    heroSubheading,
    heroImage,
    ctaText,
    ctaLink,
    seoTitle,
    seoDescription
  }`;
  
  const page = await client.fetch(query, { slug });
  return page;
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const page = await getLandingPage(params.slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || page.heroSubheading,
    ...seo(`/${params.slug}`),
  };
}

export default async function LandingPage(props: Props) {
  const params = await props.params;
  const page = await getLandingPage(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-surface)" }}>
      {/* Hero Section — dark surface is allowed here */}
      <section
        className="relative min-h-[90vh] flex items-center pt-[clamp(150px,20vh,200px)] pb-[clamp(80px,12vh,140px)] overflow-hidden"
        style={{ backgroundColor: "var(--color-bg-navy-deep)" }}
      >
        <AtmosphericBackground variant="hero" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div>
                     <h1 className="hero-h1 text-white mb-6">
                        {page.heroHeading}
                    </h1>
                     <p className="text-xl text-white/70 mb-10 max-w-xl leading-relaxed">
                        {page.heroSubheading}
                    </p>
                    
                    {page.ctaLink && (
                        <div className="flex flex-col sm:flex-row gap-4">
                             <Link href={page.ctaLink}>
                                <CTAPrimary>
                                    {page.ctaText || "Get Started"}
                                </CTAPrimary>
                             </Link>
                        </div>
                    )}
                </div>

                {/* Hero Image */}
                {page.heroImage && (
                    <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                         <Image
                            src={urlForImage(page.heroImage).url()}
                            alt={page.heroHeading || "Hero Image"}
                            fill
                            className="object-cover"
                            priority
                         />
                    </div>
                )}
            </div>
        </div>
      </section>
    </div>
  );
}
