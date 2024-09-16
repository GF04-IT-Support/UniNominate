"use client";

import {
  Button,
  Link,
  Accordion,
  AccordionItem,
  Divider,
} from "@nextui-org/react";
import React from "react";
import { MdAdd, MdEdit } from "react-icons/md";
import { NominationForm } from "@/types/nominationTypes";

interface NominationsProps {
  nominations: NominationForm[];
}

const Nominations: React.FC<NominationsProps> = ({ nominations }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Link href="/admin/nominations/builder">
          <Button
            radius="sm"
            startContent={<MdAdd size={24} />}
            className="bg-[#8B0000] text-white"
          >
            Create Nomination
          </Button>
        </Link>
      </div>
      <Accordion variant="splitted">
        {nominations.map((nomination) => (
          <AccordionItem
            key={nomination.id}
            title={nomination.name}
            classNames={{
              title: "text-[#8B0000] font-bold",
            }}
          >
            <p className="text-sm font-semibold text-[#8B0000]">
              {nomination.description}
            </p>
            <div className="mt-2">
              <Link
                href={`/admin/nominations/builder/${nomination.id}`}
                className="flex justify-end my-4"
              >
                <Button
                  size="sm"
                  color="primary"
                  className="bg-[#8B0000] text-white"
                  startContent={<MdEdit size={16} />}
                >
                  Edit
                </Button>
              </Link>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Nominations;
