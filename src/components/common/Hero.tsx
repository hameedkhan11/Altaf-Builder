import { Breadcrumb } from "./Breadcrumb";

export const HeroSection: React.FC<{
  title: string;
  subtitle: string;
  backgroundImage: string;
  page: string;
  blogTitle?: string;
}> = ({ backgroundImage, page, blogTitle }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40" />
      
      <Breadcrumb page={page} blogTitle={blogTitle} />
    </section>
  );
};