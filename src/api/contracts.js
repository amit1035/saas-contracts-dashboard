// Mock API for contracts

// Get all contracts
export const getContracts = async () => {
  console.log('API: getContracts called');
  try {
    const response = await fetch('/contracts.json');
    console.log('API: fetch response status:', response.status);
    if (!response.ok) {
      throw new Error('Failed to fetch contracts');
    }
    const data = await response.json();
    console.log('API: contracts data:', data);
    return data;
  } catch (error) {
    console.error('API: Error fetching contracts:', error);
    throw error;
  }
};

// Get contract by ID
export const getContractById = async (id) => {
  console.log('API: getContractById called with id:', id);
  try {
    // Mock data for contract details
    const contractDetails = {
      c1: {
        id: "c1",
        name: "MSA 2025",
        parties: "Microsoft & ABC Corp",
        start: "2023-01-01",
        expiry: "2025-12-31",
        status: "Active",
        risk: "Medium",
        clauses: [
          { title: "Termination", summary: "90 days notice period.", confidence: 0.82 },
          { title: "Liability Cap", summary: "12 months' fees limit.", confidence: 0.87 },
          { title: "Governing Law", summary: "Laws of State of New York.", confidence: 0.95 },
          { title: "Payment Terms", summary: "Net 30 days from invoice date.", confidence: 0.90 }
        ],
        insights: [
          { risk: "High", message: "Liability cap excludes data breach costs." },
          { risk: "Medium", message: "Renewal auto-renews unless cancelled 60 days before expiry." },
          { risk: "Low", message: "Payment terms are standard for the industry." }
        ],
        evidence: [
          { source: "Section 12.2", snippet: "Total liability limited to 12 months' fees.", relevance: 0.91 },
          { source: "Section 8.4", snippet: "This agreement will automatically renew for additional one-year terms.", relevance: 0.87 },
          { source: "Section 5.1", snippet: "Payment is due within 30 days of the invoice date.", relevance: 0.85 }
        ]
      },
      c2: {
        id: "c2",
        name: "Network Services Agreement",
        parties: "TelNet & ABC Corp",
        start: "2023-10-10",
        expiry: "2025-10-10",
        status: "Renewal Due",
        risk: "High",
        clauses: [
          { title: "Service Level Agreement", summary: "99.9% uptime guarantee.", confidence: 0.88 },
          { title: "Termination for Convenience", summary: "30 days notice with no penalty.", confidence: 0.75 },
          { title: "Data Ownership", summary: "Customer retains all rights to data.", confidence: 0.92 }
        ],
        insights: [
          { risk: "High", message: "SLA penalties are capped at 10% of monthly fees." },
          { risk: "Medium", message: "No exclusivity clause, provider can serve competitors." },
          { risk: "High", message: "Provider not liable for consequential damages." }
        ],
        evidence: [
          { source: "Section 7.3", snippet: "Provider's liability limited to fees paid in prior 12 months.", relevance: 0.93 },
          { source: "Section 5.1", snippet: "Provider shall maintain 99.9% uptime for services.", relevance: 0.89 },
          { source: "Section 12.1", snippet: "Either party may terminate this agreement with 30 days notice.", relevance: 0.82 }
        ]
      },
      c3: {
        id: "c3",
        name: "Cloud Service Agreement",
        parties: "Amazon & XYZ Inc",
        start: "2023-01-01",
        expiry: "2024-08-15",
        status: "Expired",
        risk: "High",
        clauses: [
          { title: "Service Availability", summary: "99.95% uptime commitment.", confidence: 0.90 },
          { title: "Data Security", summary: "Encryption at rest and in transit.", confidence: 0.85 },
          { title: "Termination", summary: "30 days notice for termination.", confidence: 0.78 }
        ],
        insights: [
          { risk: "High", message: "Contract has expired, renewal required." },
          { risk: "Medium", message: "Data residency requirements may not be met." },
          { risk: "Low", message: "Service terms were competitive at time of signing." }
        ],
        evidence: [
          { source: "Section 3.1", snippet: "Service Provider will maintain 99.95% availability.", relevance: 0.92 },
          { source: "Section 5.2", snippet: "All data will be encrypted using AES-256.", relevance: 0.88 },
          { source: "Section 10.1", snippet: "Either party may terminate with 30 days notice.", relevance: 0.80 }
        ]
      },
      c4: {
        id: "c4",
        name: "Software License Agreement",
        parties: "Oracle & DEF Corp",
        start: "2024-01-01",
        expiry: "2026-05-20",
        status: "Active",
        risk: "Low",
        clauses: [
          { title: "License Grant", summary: "Perpetual license for software use.", confidence: 0.95 },
          { title: "Support Services", summary: "12 months of included support.", confidence: 0.90 },
          { title: "Restrictions", summary: "No reverse engineering or decompilation.", confidence: 0.85 }
        ],
        insights: [
          { risk: "Low", message: "License terms are favorable and standard." },
          { risk: "Low", message: "Support coverage is comprehensive." },
          { risk: "Medium", message: "Annual maintenance fees increase by 5% annually." }
        ],
        evidence: [
          { source: "Section 2.1", snippet: "License is perpetual and non-exclusive.", relevance: 0.96 },
          { source: "Section 7.1", snippet: "Support services included for 12 months.", relevance: 0.91 },
          { source: "Section 4.3", snippet: "Licensee shall not reverse engineer the software.", relevance: 0.87 }
        ]
      },
      c5: {
        id: "c5",
        name: "Data Processing Agreement",
        parties: "Google & ABC Corp",
        start: "2023-01-01",
        expiry: "2025-03-30",
        status: "Renewal Due",
        risk: "Medium",
        clauses: [
          { title: "Data Processing", summary: "Google processes data on behalf of ABC Corp.", confidence: 0.88 },
          { title: "Data Security", summary: "Implement appropriate security measures.", confidence: 0.92 },
          { title: "Subprocessors", summary: "Use of subprocessors requires consent.", confidence: 0.85 }
        ],
        insights: [
          { risk: "Medium", message: "Contract renewal due in less than 30 days." },
          { risk: "Low", message: "Data processing terms comply with GDPR." },
          { risk: "Medium", message: "Some subprocessors may not be audited." }
        ],
        evidence: [
          { source: "Section 3.1", snippet: "Google processes personal data on behalf of Customer.", relevance: 0.90 },
          { source: "Section 5.1", snippet: "Google shall implement appropriate technical measures.", relevance: 0.94 },
          { source: "Section 7.2", snippet: "Customer's consent required for subprocessors.", relevance: 0.86 }
        ]
      },
      c6: {
        id: "c6",
        name: "Consulting Services Agreement",
        parties: "McKinsey & GHI Ltd",
        start: "2023-06-01",
        expiry: "2024-11-25",
        status: "Expired",
        risk: "Low",
        clauses: [
          { title: "Services", summary: "Strategic consulting services as described.", confidence: 0.90 },
          { title: "Payment Terms", summary: "Monthly invoices with 30-day payment terms.", confidence: 0.95 },
          { title: "Confidentiality", summary: "5-year confidentiality obligation.", confidence: 0.85 }
        ],
        insights: [
          { risk: "Low", message: "Contract has expired but obligations may continue." },
          { risk: "Low", message: "All deliverables were successfully completed." },
          { risk: "Medium", message: "Some final invoices may be outstanding." }
        ],
        evidence: [
          { source: "Section 2.1", snippet: "Consultant shall provide strategic consulting services.", relevance: 0.92 },
          { source: "Section 5.1", snippet: "Client shall pay invoices within 30 days of receipt.", relevance: 0.97 },
          { source: "Section 6.1", snippet: "Confidential information shall be kept confidential for 5 years.", relevance: 0.88 }
        ]
      },
      c7: {
        id: "c7",
        name: "Support Services Agreement",
        parties: "IBM & JKL Corp",
        start: "2024-01-01",
        expiry: "2026-02-28",
        status: "Active",
        risk: "Medium",
        clauses: [
          { title: "Support Scope", summary: "24/7 support for critical issues.", confidence: 0.92 },
          { title: "Response Times", summary: "Critical issues: 1 hour response time.", confidence: 0.88 },
          { title: "Service Levels", summary: "99% availability for support systems.", confidence: 0.90 }
        ],
        insights: [
          { risk: "Medium", message: "Support costs increase by 8% annually." },
          { risk: "Low", message: "Support coverage is comprehensive." },
          { risk: "Medium", message: "Some legacy systems may have limited support." }
        ],
        evidence: [
          { source: "Section 3.1", snippet: "IBM shall provide 24/7 support for critical issues.", relevance: 0.94 },
          { source: "Section 4.2", snippet: "Critical issues shall have 1 hour response time.", relevance: 0.90 },
          { source: "Section 5.1", snippet: "Support systems shall maintain 99% availability.", relevance: 0.92 }
        ]
      },
      c8: {
        id: "c8",
        name: "Marketing Partnership Agreement",
        parties: "Facebook & MNO Inc",
        start: "2023-01-01",
        expiry: "2025-07-18",
        status: "Active",
        risk: "High",
        clauses: [
          { title: "Partnership Scope", summary: "Joint marketing initiatives.", confidence: 0.85 },
          { title: "Revenue Sharing", summary: "50/50 revenue split on joint campaigns.", confidence: 0.90 },
          { title: "Term and Termination", summary: "2-year term with 60-day termination notice.", confidence: 0.88 }
        ],
        insights: [
          { risk: "High", message: "Recent platform changes may affect partnership terms." },
          { risk: "Medium", message: "Revenue sharing calculations are complex." },
          { risk: "High", message: "Brand alignment issues have been reported." }
        ],
        evidence: [
          { source: "Section 2.1", snippet: "Parties shall collaborate on joint marketing initiatives.", relevance: 0.88 },
          { source: "Section 4.1", snippet: "Revenue from joint campaigns shall be split 50/50.", relevance: 0.92 },
          { source: "Section 7.1", snippet: "Agreement has 2-year term with 60-day termination notice.", relevance: 0.90 }
        ]
      },
      c9: {
        id: "c9",
        name: "Reseller Agreement",
        parties: "Apple & PQR Ltd",
        start: "2023-01-01",
        expiry: "2025-09-12",
        status: "Renewal Due",
        risk: "Low",
        clauses: [
          { title: "Reseller Rights", summary: "Non-exclusive right to resell Apple products.", confidence: 0.95 },
          { title: "Pricing", summary: "Reseller pricing as per Apple's schedule.", confidence: 0.90 },
          { title: "Term", summary: "Initial 2-year term with automatic renewal.", confidence: 0.85 }
        ],
        insights: [
          { risk: "Low", message: "Reseller terms are standard and favorable." },
          { risk: "Low", message: "Product margins are consistent with industry." },
          { risk: "Medium", message: "Renewal due in 6 months, terms may change." }
        ],
        evidence: [
          { source: "Section 2.1", snippet: "Apple grants Reseller non-exclusive right to sell Products.", relevance: 0.96 },
          { source: "Section 3.1", snippet: "Reseller shall purchase Products at prices set by Apple.", relevance: 0.92 },
          { source: "Section 6.1", snippet: "Initial term is 2 years with automatic renewal.", relevance: 0.88 }
        ]
      },
      c10: {
        id: "c10",
        name: "Non-Disclosure Agreement",
        parties: "Tesla & STU Corp",
        start: "2023-01-01",
        expiry: "2024-06-30",
        status: "Expired",
        risk: "Medium",
        clauses: [
          { title: "Confidential Information", summary: "Definition of confidential information.", confidence: 0.90 },
          { title: "Obligations", summary: "5-year obligation to maintain confidentiality.", confidence: 0.95 },
          { title: "Exclusions", summary: "Information publicly known or independently developed.", confidence: 0.85 }
        ],
        insights: [
          { risk: "Medium", message: "NDA has expired but some obligations may continue." },
          { risk: "Low", message: "No reported breaches during term." },
          { risk: "Medium", message: "Some shared information may now be public." }
        ],
        evidence: [
          { source: "Section 1.1", snippet: "Confidential Information means non-public information.", relevance: 0.92 },
          { source: "Section 2.1", snippet: "Receiving Party shall maintain confidentiality for 5 years.", relevance: 0.96 },
          { source: "Section 1.2", snippet: "Exclusions include publicly available information.", relevance: 0.88 }
        ]
      },
      c11: {
        id: "c11",
        name: "Joint Venture Agreement",
        parties: "Samsung & VWX Inc",
        start: "2023-01-01",
        expiry: "2027-04-10",
        status: "Active",
        risk: "High",
        clauses: [
          { title: "JV Formation", summary: "Formation of joint venture entity.", confidence: 0.90 },
          { title: "Capital Contributions", summary: "Equal contributions from both parties.", confidence: 0.95 },
          { title: "Management", summary: "Board with equal representation.", confidence: 0.88 }
        ],
        insights: [
          { risk: "High", message: "Market conditions have changed since JV formation." },
          { risk: "Medium", message: "Technology integration challenges reported." },
          { risk: "High", message: "One party may seek to exit the JV." }
        ],
        evidence: [
          { source: "Section 2.1", snippet: "Parties shall form a joint venture entity.", relevance: 0.92 },
          { source: "Section 3.1", snippet: "Each party shall contribute $10M to JV capital.", relevance: 0.96 },
          { source: "Section 5.1", snippet: "Board shall have equal representation from both parties.", relevance: 0.90 }
        ]
      },
      c12: {
        id: "c12",
        name: "Technology License Agreement",
        parties: "Sony & YZA Ltd",
        start: "2023-01-01",
        expiry: "2025-11-05",
        status: "Active",
        risk: "Low",
        clauses: [
          { title: "License Grant", summary: "Exclusive license for patented technology.", confidence: 0.95 },
          { title: "Royalty Payments", summary: "5% royalty on net sales.", confidence: 0.90 },
          { title: "Term", summary: "5-year license term.", confidence: 0.85 }
        ],
        insights: [
          { risk: "Low", message: "License terms are favorable and exclusive." },
          { risk: "Low", message: "Technology is well-established and proven." },
          { risk: "Medium", message: "Royalty payments are subject to audit." }
        ],
        evidence: [
          { source: "Section 2.1", snippet: "Sony grants exclusive license to patented technology.", relevance: 0.96 },
          { source: "Section 4.1", snippet: "Licensee shall pay 5% royalty on net sales.", relevance: 0.92 },
          { source: "Section 6.1", snippet: "License term shall be 5 years from Effective Date.", relevance: 0.88 }
        ]
      }
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const data = contractDetails[id];
    console.log('API: contract details data:', data);
    return data;
  } catch (error) {
    console.error(`API: Error fetching contract ${id}:`, error);
    throw error;
  }
};