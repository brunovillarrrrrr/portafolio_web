
import { FadeIn } from "./FadeIn";
import { SectionTitle } from "./SectionTitle";

export const Blog = () => {
  return (
    <div className="mt-24 sm:mt-32 lg:mt-40">
      <SectionTitle
        title="Blog"
        className="text-center"
      >
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Aquí comparto mis pensamientos y experiencias sobre desarrollo web, IA y más.
        </p>
      </SectionTitle>
      <div className="mt-16">
        <FadeIn>
          <div className="prose dark:prose-invert">
            <h2>
              <a href="#">
                Mi primer post
              </a>
            </h2>
            <p>
              Este es el contenido de mi primer post en el blog. Pronto añadiré más contenido.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};
