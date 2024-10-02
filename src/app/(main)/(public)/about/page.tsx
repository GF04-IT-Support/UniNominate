import React from "react";
import { Card, CardBody } from "@nextui-org/react";

export default function AboutPage() {
  return (
    <div>
      <div className="bg-[#8B0000] text-white py-20 mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
          About KNUST Nomination System
        </h1>
        <p className="text-xl text-center">
          Empowering student leadership through transparent and efficient
          nominations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardBody>
            <h2 className="text-2xl font-bold mb-4 text-center">Our Mission</h2>
            <p>
              To facilitate a fair and transparent process for nominating and
              selecting student leaders at KNUST.
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h2 className="text-2xl font-bold mb-4 text-center">Our Vision</h2>
            <p>
              To be the gold standard for student leadership selection in higher
              education institutions across Ghana.
            </p>
          </CardBody>
        </Card>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">
          About the System
        </h2>
        <p className="mb-4 text-center">
          The KNUST Nomination System is a state-of-the-art platform designed to
          streamline the process of nominating and selecting student leaders. It
          provides a fair, transparent, and efficient method for students to
          participate in the leadership of their institution.
        </p>
        <p>
          Developed with the latest technology, our system ensures that every
          eligible student has an equal opportunity to nominate themselves or
          others for leadership positions. It simplifies the nomination process,
          making it more accessible and user-friendly for all KNUST students.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Key Features</h2>
        <ul className="list-disc pl-6">
          <li>Online nomination submissions</li>
          <li>Transparent review process</li>
          <li>Equal opportunity for all eligible students</li>
          <li>Efficient management of nomination data</li>
          <li>Real-time updates on nomination status</li>
          <li>Secure and confidential handling of student information</li>
        </ul>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardBody>
              <h3 className="text-xl font-semibold mb-2 text-center">
                For Students
              </h3>
              <ul className="list-disc pl-6">
                <li>Easy access to leadership opportunities</li>
                <li>Fair consideration for all nominees</li>
                <li>Gain valuable leadership experience</li>
                <li>Contribute to the KNUST community</li>
              </ul>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h3 className="text-xl font-semibold mb-2 text-center">
                For KNUST
              </h3>
              <ul className="list-disc pl-6">
                <li>Identify and nurture future leaders</li>
                <li>Improve student engagement in governance</li>
                <li>Streamline the nomination process</li>
                <li>Enhance transparency in student leadership selection</li>
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
