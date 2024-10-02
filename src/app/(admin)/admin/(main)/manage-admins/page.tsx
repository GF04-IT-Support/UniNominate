import { getAdmins } from "@/services/admin/adminService";
import AdminList from "@/components/pages/admin/manage-admins/AdminList";

export default async function ManageAdminsPage() {
  const admins = await getAdmins();

  return (
    <div >
      <AdminList initialAdmins={admins} />
    </div>
  );
}
