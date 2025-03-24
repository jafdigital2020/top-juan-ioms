import { z } from "zod";
import { DialogHeader } from "../../../../components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

const franchiseSchema = z.object({
  user_id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  address: z.string(),
  phone: z.string(),
  password: z.string(),
  role_id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  is_active: z.boolean(),
  outlets: z.array(
    z.object({
      outlet_id: z.number(),
      franchisee_id: z.number(),
      franchise_name: z.string(),
      address: z.string(),
      city: z.string(),
      province: z.string(),
    })
  ),
  contracts: z.array(
    z.object({
      contract_id: z.number(),
      agreement_start: z.string(),
      agreement_end: z.string(),
      document_url: z.string().url().optional().nullable(),
      created_at: z.string(),
      updated_at: z.string(),
      franchisee_id: z.number(),
    })
  ),
});

export type FranchiseType = z.infer<typeof franchiseSchema>;

type viewProps = {
  franchise: FranchiseType;
};
export default function FranchiseViewDialog({ franchise }: viewProps) {
  return (
    <div className="p-6 rounded-lg">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold">
          Franchise Details
        </DialogTitle>
      </DialogHeader>
      <div className="py-4">
        <h2 className="text-lg font-medium">
          {franchise.first_name} {franchise.last_name}
        </h2>
        <p className="text-sm text-gray-600">Email: {franchise.email}</p>
        <p className="text-sm text-gray-600">Address: {franchise.address}</p>
        <p className="text-sm text-gray-600">Phone: {franchise.phone}</p>

        <h3 className="text-lg font-medium mt-4">Outlets</h3>
        {franchise.outlets.map((outlet) => (
          <div key={outlet.outlet_id} className="mb-2">
            <p className="text-sm text-gray-600">
              Franchise Name: {outlet.franchise_name}
            </p>
            <p className="text-sm text-gray-600">Address: {outlet.address}</p>
            <p className="text-sm text-gray-600">City: {outlet.city}</p>
            <p className="text-sm text-gray-600">Province: {outlet.province}</p>
          </div>
        ))}
        <h3 className="text-lg font-medium mt-4">Contracts</h3>
        {franchise.contracts.map((contract) => (
          <div key={contract.contract_id} className="mb-2">
            <p className="text-sm text-gray-600">
              Agreement Start: {contract.agreement_start}
            </p>
            <p className="text-sm text-gray-600">
              Agreement End: {contract.agreement_end}
            </p>
            {contract.document_url && (
              <p className="text-sm text-gray-600">
                Document:{" "}
                <a
                  href={contract.document_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contract.document_url}
                </a>
              </p>
            )}
            <p className="text-sm text-gray-600">
              Created at: {contract.created_at}
            </p>
            <p className="text-sm text-gray-600">
              Updated at: {contract.updated_at}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
