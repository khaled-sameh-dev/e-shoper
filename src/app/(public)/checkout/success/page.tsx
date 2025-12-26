// import { Suspense } from "react";
// import Link from "next/link";
// import { CheckCircle, Package, ArrowRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";

// function SuccessContent() {
//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
//       <Card className="max-w-2xl w-full">
//         <CardContent className="pt-12 pb-8">
//           <div className="text-center space-y-6">
//             {/* Success Icon */}
//             <div className="flex justify-center">
//               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
//                 <CheckCircle className="w-12 h-12 text-green-600" />
//               </div>
//             </div>

//             {/* Title */}
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                 Order Placed Successfully!
//               </h1>
//               <p className="text-gray-600">
//                 Thank you for your purchase. We've received your order and will
//                 send you a confirmation email shortly.
//               </p>
//             </div>

//             {/* Order Info */}
//             <div className="bg-gray-50 rounded-lg p-6 space-y-3">
//               <div className="flex items-center justify-center gap-2 text-gray-700">
//                 <Package className="w-5 h-5" />
//                 <span className="font-semibold">
//                   Your order is being processed
//                 </span>
//               </div>
//               <p className="text-sm text-gray-600">
//                 You'll receive tracking information once your order ships.
//               </p>
//             </div>

//             {/* Actions */}
//             <div className="flex flex-col sm:flex-row gap-3 pt-4">
//               <Button asChild className="flex-1">
//                 <Link
//                   href="/orders"
//                   className="flex items-center justify-center gap-2"
//                 >
//                   View Orders
//                   <ArrowRight className="w-4 h-4" />
//                 </Link>
//               </Button>
//               <Button asChild variant="outline" className="flex-1">
//                 <Link href="/products">Continue Shopping</Link>
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default function CheckoutSuccessPage() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <SuccessContent />
//     </Suspense>
//   );
// }

import { Suspense } from "react";
import CheckoutSuccessClient from "../_components/CheckoutSuccessClient";

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutSuccessClient />
    </Suspense>
  );
}
