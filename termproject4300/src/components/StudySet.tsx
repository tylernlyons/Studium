import Link from "next/link";
import Image from "next/image";
import Card from "./Card";

interface Term {
  term: string;
  definition: string;
}

export interface StudySetProps {
  set: {
    _id: number;
    title: string;
    url: string;
    terms: Term[];
  };
}

const StudySet = ({ set }: StudySetProps) => {
  return (
    <Card>
      <h2 className="text-lg font-semibold">{set.title}</h2>

      {/* Display image from the study set */}
      <div className="w-full h-68 relative">
        <Image src={set.url} alt={set.title} fill className="object-cover rounded-md" />
      </div>

      <p>Terms in set: {set.terms.length}</p>

      {/* Link to study set view */}
      <Link
        href={`/show-set/${set._id}`}
        className="mt-4 inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        View Set
      </Link>
    </Card>
  );
};

export default StudySet;
