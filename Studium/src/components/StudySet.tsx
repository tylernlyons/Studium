import Link from "next/link";
import Image from "next/image";
import Card from "./Card";

interface Term {
  term: string;
  definition: string;
}

export interface StudySetProps {
  set: {
    _id: string | number;
    title: string;
    url: string;
    terms: Term[];
    isPublic?: boolean;
    canEdit?: boolean;
    ownerUsername?: string;
  };
}

const StudySet = ({ set }: StudySetProps) => {
  return (
    <div className="shadow-md hover:shadow-xl rounded hover:-translate-y-1 transition duration-300 ease-in-out">
    <Card className="h-full">
      <h2 className="text-lg font-semibold text-[#1b2d48] pb-2">{set.title}</h2>

      {/* Display image from the study set */}
      <div className="w-full h-44 relative">
        <Image src={set.url} alt={set.title} fill className="object-cover rounded-md" />
      </div>
<div className="text-[#1b2d48] pt-2">
      <p>Terms in set: {set.terms.length}</p>
      <p className="text-sm text-[#3f5d86]">
        {set.isPublic !== false ? "Public" : "Private"} • by {set.ownerUsername || "Unknown user"}
      </p>
</div>
      {/* Link to study set view */}
      <Link
        href={`/show-set/${set._id}`}
        className="mt-4 inline-block app-btn-primary"
      >
        View Set
      </Link>
    </Card>
    </div>
  );
};

export default StudySet;
