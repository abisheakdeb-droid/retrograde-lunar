"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileText, Download, Printer, Percent, BadgeCheck } from "lucide-react"
import { Payslip } from "@/lib/data/generators"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface PayslipDialogProps {
    payslip: Payslip;
}

export function PayslipDialog({ payslip }: PayslipDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="xs" variant="ghost" className="h-7 w-7 p-0 hover:bg-primary/20">
                    <FileText className="h-3.5 w-3.5 text-muted-foreground transition-colors hover:text-primary" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-[#0F1115] border-primary/20 tactical-grid">
                <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-primary/10">
                    <div>
                        <DialogTitle className="text-2xl font-bold tracking-tighter uppercase flex items-center gap-2">
                            <BadgeCheck className="h-6 w-6 text-primary" />
                            Official Payslip
                        </DialogTitle>
                        <DialogDescription className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                            Reference ID: {payslip.id} • {payslip.month}
                        </DialogDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="xs" className="h-8 font-mono text-[9px] uppercase border-primary/30">
                            <Printer className="mr-1.5 h-3 w-3" />
                            Print
                        </Button>
                        <Button size="xs" className="h-8 bg-primary text-primary-foreground font-mono text-[9px] uppercase neon-glow-cyan">
                            <Download className="mr-1.5 h-3 w-3" />
                            Export PDF
                        </Button>
                    </div>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-8 py-6">
                    {/* Personnel Info */}
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <span className="technical-label">Employee Identity</span>
                            <p className="text-sm font-bold uppercase">{payslip.employeeName}</p>
                            <p className="text-xs font-mono text-muted-foreground">{payslip.employeeId}</p>
                        </div>
                        <div className="space-y-1">
                            <span className="technical-label">Payment Mode</span>
                            <p className="text-xs font-mono">Electronic Transfer</p>
                        </div>
                    </div>

                    <div className="space-y-4 text-right">
                        <div className="space-y-1">
                            <span className="technical-label">Disbursement Date</span>
                            <p className="text-xs font-mono uppercase">{payslip.paymentDate || "TBA"}</p>
                        </div>
                        <div className="space-y-1">
                            <span className="technical-label">Audit Status</span>
                            <div className="flex items-center justify-end gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                                <span className="text-xs font-mono uppercase text-emerald-500">{payslip.status}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-0 border border-primary/10 rounded-lg overflow-hidden">
                    {/* Earnings */}
                    <div className="p-4 border-r border-primary/10 bg-muted/5">
                        <h4 className="technical-label mb-3 flex items-center gap-2">
                            <Percent className="h-3 w-3 text-emerald-500" />
                            EARNINGS (CR)
                        </h4>
                        <div className="space-y-2">
                            {payslip.earnings.map((e, i) => (
                                <div key={i} className="flex justify-between text-[11px] font-mono">
                                    <span className="text-muted-foreground uppercase">{e.name}</span>
                                    <span>৳{e.amount.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Deductions */}
                    <div className="p-4 bg-red-950/5">
                        <h4 className="technical-label mb-3 flex items-center gap-2">
                            <Percent className="h-3 w-3 text-red-500" />
                            DEDUCTIONS (DR)
                        </h4>
                        <div className="space-y-2">
                            {payslip.deductions.map((d, i) => (
                                <div key={i} className="flex justify-between text-[11px] font-mono">
                                    <span className="text-muted-foreground uppercase">{d.name}</span>
                                    <span className="text-red-400">-৳{d.amount.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-4 p-4 bg-primary/10 flex justify-between items-center border-l-4 border-l-primary shadow-[inset_0_0_20px_rgba(6,182,212,0.05)]">
                    <div>
                        <span className="technical-label">Net Compensation (BNK)</span>
                        <p className="text-xs text-muted-foreground font-mono">Operational Net Total</p>
                    </div>
                    <div className="text-2xl font-bold font-mono text-primary drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">
                        ৳{payslip.netSalary.toLocaleString()}
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-primary/10 text-center">
                    <p className="text-[8px] font-mono text-muted-foreground uppercase leading-relaxed tracking-tighter">
                        This is a computer generated document authorized by Ha-Meem Group Industrial Systems. 
                        No signature required for audit purposes. All values in BDT.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}
