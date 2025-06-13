import Link from "next/link";

interface Props {
  page: string;
  blogTitle?: string;
}
export const Breadcrumb: React.FC<Props> = ({ page, blogTitle }) => {
  return (
    <div className="absolute bottom-0 left-8 z-20">
      <nav className="flex items-center space-x-2 text-white/80 text-sm">
        <Link href="/" className="transition-colors">
          <h3 className="text-white  hover:text-white/80">Home</h3>
        </Link>
        <span className="h-8">/</span>
        <Link href="/blogs" className="transition-colors">
          <h3 className="text-white  hover:text-white/80">{page}</h3>
        </Link>
        {blogTitle && (
          <>
            <span className="h-8">/</span>
            <h3 className="text-white hover:text-white/80 max-w-md truncate">
              {blogTitle}
            </h3>
          </>
        )}
      </nav>
    </div>
  );
};
