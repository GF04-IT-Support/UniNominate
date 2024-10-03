import React from "react";
import { Card, CardBody, Image } from "@nextui-org/react";
import {
  FaGraduationCap,
  FaUsers,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-[#8B0000] text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
            About KNUST Nomination System
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Empowering student leadership through transparent and efficient
            nominations
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-lg">
            <CardBody className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-center text-[#8B0000]">
                Our Mission
              </h2>
              <p className="text-gray-700">
                To facilitate a fair and transparent process for nominating and
                selecting student leaders at KNUST, fostering a culture of
                democracy and excellence in student governance.
              </p>
            </CardBody>
          </Card>
          <Card className="shadow-lg">
            <CardBody className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-center text-[#8B0000]">
                Our Vision
              </h2>
              <p className="text-gray-700">
                To be the gold standard for student leadership selection in
                higher education institutions across Ghana, inspiring future
                leaders and promoting democratic values.
              </p>
            </CardBody>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#8B0000]">
            About the System
          </h2>
          <p className="mb-4 text-center text-gray-700 max-w-3xl mx-auto">
            The KNUST Nomination System is a state-of-the-art platform designed
            to streamline the process of nominating and selecting student
            leaders. It provides a fair, transparent, and efficient method for
            students to participate in the leadership of their institution.
          </p>
          <p className="text-center text-gray-700 max-w-3xl mx-auto">
            Developed with the latest technology, our system ensures that every
            eligible student has an equal opportunity to nominate themselves or
            others for leadership positions. It simplifies the nomination
            process, making it more accessible and user-friendly for all KNUST
            students.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#8B0000]">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: FaUsers, text: "Online nomination submissions" },
              { icon: FaChartLine, text: "Transparent review process" },
              {
                icon: FaGraduationCap,
                text: "Equal opportunity for all eligible students",
              },
              {
                icon: FaShieldAlt,
                text: "Secure and confidential handling of student information",
              },
            ].map((feature, index) => (
              <Card key={index} className="shadow-lg">
                <CardBody className="p-6 flex flex-col items-center">
                  <feature.icon className="text-4xl text-[#8B0000] mb-4" />
                  <p className="text-center text-gray-700">{feature.text}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#8B0000]">
            Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardBody className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-center text-[#8B0000]">
                  For Students
                </h3>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Easy access to leadership opportunities</li>
                  <li>Fair consideration for all nominees</li>
                  <li>Gain valuable leadership experience</li>
                  <li>Contribute to the KNUST community</li>
                </ul>
              </CardBody>
            </Card>
            <Card className="shadow-lg">
              <CardBody className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-center text-[#8B0000]">
                  For KNUST
                </h3>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Identify and nurture future leaders</li>
                  <li>Improve student engagement in governance</li>
                  <li>Streamline the nomination process</li>
                  <li>Enhance transparency in student leadership selection</li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#8B0000]">
            Join Us in Shaping the Future
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Be part of the KNUST Nomination System and contribute to the growth
            of student leadership at our esteemed institution. Together, we can
            build a stronger, more engaged student community.
          </p>
        </div>
      </div>
    </div>
  );
}
