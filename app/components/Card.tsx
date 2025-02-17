"use client";

import Link from "next/link";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import PreviewCard from "./PreviewCard";
import UserProfile from "@/interfaces/userProfile.interface";

const cleanUrl = (link: string) => {
  return (
    link
      .replace(/^https?:\/\//, "")
      .replace(/\/$/, "")
      .slice(0, 29) + (link.length > 29 ? "..." : "")
  );
};

const Card = ({ profile }: { profile: UserProfile }) => {
  const { name, link, tags, socials } = profile;
  const formattedTags = tags.map((tag) => tag.toLowerCase());
  const [previewCardIsOpen, setPreviewCardIsOpen] = useState(false);
  const togglePreviewCardVisibility = () => {
    setPreviewCardIsOpen(!previewCardIsOpen);
  };

  return (
    <>
      <Modal show={previewCardIsOpen} onHide={togglePreviewCardVisibility}>
        <PreviewCard
          handlePreviewCardClose={togglePreviewCardVisibility}
          name={name}
          link={link}
          tags={formattedTags}
          socials={socials}
        />
      </Modal>
      <div className="card" onClick={togglePreviewCardVisibility}>
        <div className="card-container">
          <h2>{name}</h2>
          {typeof link === "string" && (
            <Link
              href={link}
              target="_blank"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {cleanUrl(link)}
            </Link>
          )}
          {Array.isArray(link) && (
            <div>
              {link.map((singleLink: string, index: any) => (
                <Link
                  href={singleLink}
                  target="_blank"
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {cleanUrl(singleLink)}
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="card-tags">
          {formattedTags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Card;
