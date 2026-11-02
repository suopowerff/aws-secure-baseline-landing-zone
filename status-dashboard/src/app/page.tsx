'use client';

import React, { useEffect, useState } from 'react';

export default function SecurityPosturePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posture')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center font-mono">
        Querying AWS Control Plane Telemetry...
      </div>
    );
  }

  const { controls } = data;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                {data.mode} • {data.region}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight mt-1">
              AWS Secure Landing Zone Posture
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Continuous GRC & Preventative Guardrail Verification (CIS AWS Foundations / GDPR Residency)
            </p>
          </div>
          <div className="mt-4 md:mt-0 bg-slate-900 border border-slate-800 px-5 py-3 rounded-lg text-right">
            <span className="text-xs text-slate-400 uppercase font-mono">Posture Score</span>
            <div className="text-2xl font-bold text-emerald-400">{data.overallScore}% Compliant</div>
          </div>
        </header>

        {/* Control Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SCP EU Lock Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">AWS Organizations SCP (EU Lock)</h2>
              <span className="px-2.5 py-1 text-xs font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 rounded">
                {controls.scp.status}
              </span>
            </div>
            <dl className="space-y-2 text-sm text-slate-300 font-mono">
              <div className="flex justify-between">
                <dt className="text-slate-500">Policy Name:</dt>
                <dd>{controls.scp.policyName}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Policy ID:</dt>
                <dd>{controls.scp.policyId}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Guardrail Scope:</dt>
                <dd className="text-right text-emerald-300">{controls.scp.guardrail}</dd>
              </div>
            </dl>
          </div>

          {/* CloudTrail Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">AWS CloudTrail Audit Logging</h2>
              <span className="px-2.5 py-1 text-xs font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 rounded">
                {controls.cloudtrail.status}
              </span>
            </div>
            <dl className="space-y-2 text-sm text-slate-300 font-mono">
              <div className="flex justify-between">
                <dt className="text-slate-500">Trail Identifier:</dt>
                <dd>{controls.cloudtrail.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Multi-Region Active:</dt>
                <dd>{controls.cloudtrail.multiRegion ? 'TRUE' : 'FALSE'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">SHA-256 Log Validation:</dt>
                <dd>{controls.cloudtrail.logFileValidation ? 'ENABLED' : 'DISABLED'}</dd>
              </div>
            </dl>
          </div>

          {/* GuardDuty Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Amazon GuardDuty Threat Detection</h2>
              <span className="px-2.5 py-1 text-xs font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 rounded">
                {controls.guardduty.status}
              </span>
            </div>
            <dl className="space-y-2 text-sm text-slate-300 font-mono">
              <div className="flex justify-between">
                <dt className="text-slate-500">Detector ID:</dt>
                <dd>{controls.guardduty.detectorId}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">S3 & EBS Malware Protection:</dt>
                <dd>{controls.guardduty.s3Protection}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Export Frequency:</dt>
                <dd>{controls.guardduty.frequency}</dd>
              </div>
            </dl>
          </div>

          {/* KMS Encryption Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">AWS KMS Cryptographic Baseline</h2>
              <span className="px-2.5 py-1 text-xs font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 rounded">
                {controls.kms.status}
              </span>
            </div>
            <dl className="space-y-2 text-sm text-slate-300 font-mono">
              <div className="flex justify-between">
                <dt className="text-slate-500">Key Alias / ID:</dt>
                <dd>{controls.kms.keyId}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Key State:</dt>
                <dd>{controls.kms.keyState}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Annual Key Rotation (365d):</dt>
                <dd>{controls.kms.rotationEnabled ? 'ENABLED' : 'DISABLED'}</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Region Matrix */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-4">
            Data Residency Matrix (`aws:RequestedRegion` Guardrail)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            {data.allowedRegions.map((reg: string) => (
              <div key={reg} className="bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 p-3 rounded flex justify-between items-center">
                <span>{reg}</span>
                <span className="text-[10px] bg-emerald-900 px-1.5 py-0.5 rounded">ALLOWED</span>
              </div>
            ))}
            {['us-east-1', 'us-west-2', 'ap-southeast-1', 'sa-east-1'].map((blocked) => (
              <div key={blocked} className="bg-rose-950/30 border border-rose-900/50 text-rose-400 p-3 rounded flex justify-between items-center opacity-75">
                <span>{blocked}</span>
                <span className="text-[10px] bg-rose-950 px-1.5 py-0.5 rounded">SCP DENIED</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
