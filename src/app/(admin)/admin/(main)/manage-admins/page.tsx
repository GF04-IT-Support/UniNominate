import { getAdmins } from "@/services/admin/adminService";
import AdminList from "@/components/pages/admin/manage-admins/AdminList";
import AddAdminForm from "@/components/pages/admin/manage-admins/AddAdminForm";

export default async function ManageAdminsPage() {
  const admins = await getAdmins();

  return (
    <div >
      <AdminList initialAdmins={admins} />
    </div>
  );
}
